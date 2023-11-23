<?php

namespace App\Http\Controllers;

use App\Http\Resources\BikeResource;
use App\Models\Bike;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class BikeController extends Controller
{
    private array $validationRules = [
        'model' => 'required|max:255',
        'description' => 'nullable',
        'image' => 'nullable',
        'brand_id' => 'nullable|numeric',
        'category_id' => 'nullable|numeric',
        'quantity_in_stock' => 'nullable',
        'price' => 'nullable|numeric|between:0,99999.99',
        'battery_in_wh' => 'nullable',
        'range_in_km' => 'nullable',
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
            $bike = Bike::create($request->all());
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
        $request->validate($this->validationRules);
        $bike->update([$request->all()]);
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
}
