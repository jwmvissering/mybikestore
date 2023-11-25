<?php

namespace App\Http\Controllers;

use App\Http\Resources\BikeResource;
use App\Models\Bike;
use App\Models\Brand;
use App\Models\Category;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Symfony\Component\HttpKernel\Exception\HttpException;

class BikeController extends Controller
{
    private array $validationRules = [
        'model' => 'required|max:255',
        'description' => 'nullable',
        'image' => 'nullable',
        'brand_id' => 'nullable|numeric',
        'category_id' => 'nullable|numeric',
        'quantity_in_stock' => 'nullable|numeric',
        'price' => 'nullable|numeric|between:0,99999.99',
        'wh_of_motor' => 'nullable|numeric',
        'range_in_km' => 'nullable|numeric',
    ];

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return BikeResource::collection(Bike::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate($this->validationRules);

            $filePath = $this->saveImageAndGetFilePath($request);
            $bike = Bike::create([
                'model' => $request->get('model'),
                'description' => $request->get('description'),
                'quantity_in_stock' => $request->get('quantity_in_stock', 0),
                'image' => $filePath ?? null,
                'price' => $request->get('price'),
                'wh_of_motor' => $request->get('wh_of_motor'),
                'range_in_km' => $request->get('range_in_km'),
            ]);

            $this->associateModels($request, $bike);

            return (new BikeResource($bike))
                ->response()
                ->setStatusCode(201);
        } catch (Exception $exception) {
            throw new HttpException(400, "Could not create bike - {$exception->getMessage()}");
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Bike $bike)
    {
        return new BikeResource($bike);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bike $bike)
    {
        try {
            $request->validate($this->validationRules);

            $filePath = $this->saveImageAndGetFilePath($request);
            $bike->update([
                'model' => $request->get('model', $bike->model),
                'description' => $request->get('description', $bike->description),
                'quantity_in_stock' => $request->get('quantity_in_stock', $bike->quantity_in_stock),
                'image' => $filePath ?? $bike->image,
                'price' => $request->get('price', $bike->price),
                'wh_of_motor' => $request->get('wh_of_motor'),
                'range_in_km' => $request->get('range_in_km'),
            ]);

            $this->associateModels($request, $bike);

            return new BikeResource($bike);
        } catch (Exception $exception) {
            throw new HttpException(400, "Could not update bike - {$exception->getMessage()}");
        }
    }

    /**
     * Update the quantity of the bike.
     */
    public function updateQuantity(Request $request, Bike $bike)
    {
        $request->validate([
            'quantity_in_stock' => 'nullable|numeric',
        ]);
        $bike->update(['quantity_in_stock' => $request->quantity_in_stock]);
        return new BikeResource($bike);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bike $bike)
    {
        $bike->delete();
        response()->json(null, 204);
    }

    public function uploadFile(UploadedFile $uploadedFile, $folder = null, $disk = 'public', $filename = null)
    {
        $name = !is_null($filename) ? $filename : Str::random(25);
        $file = $uploadedFile->storeAs($folder, $name . '.' . $uploadedFile->getClientOriginalExtension(), $disk);
        return $file;
    }

    private function saveImageAndGetFilePath(Request $request)
    {
        $image = $request->image;
        $filePath = null;
        if (!empty($image)) {
            try {
                $name = Str::slug($request->model) . '_' . time();
                $folder = '/uploads/images/';
                $filePath = $folder . $name . '.' . $image->getClientOriginalExtension();
                $this->uploadFile($image, $folder, 'public', $name);
            } catch (Exception $exception) {
                throw new HttpException(500, "Could not save image - {$exception->getMessage()}");
            }
        }
        return $filePath;
    }

    private function associateModels(Request $request, Bike $bike)
    {
        if ($request->has('brand_id') || $request->has('category_id')) {
            if ($request->has('brand_id')) {
                $brand = Brand::find($request->get('brand_id'));
                $bike->brand()->associate($brand);
            }
            if ($request->has('category_id')) {
                $category = Category::find($request->get('category_id'));
                $bike->category()->associate($category);
            }
            $bike->save();
        }
    }
}
