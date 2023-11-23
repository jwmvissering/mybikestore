<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BikeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'model' => $this->model,
            'description' => $this->description,
            'image' => $this->image,
            'quantity_in_stock' => $this->quantity_in_stock,
            'price' => $this->price,
            'battery_in_wh' => $this->battery_in_wh,
            'range_in_km' => $this->range_in_km,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'brand' => new BrandResource($this->brand),
            'category' => new CategoryResource($this->category),
        ];
    }
}
