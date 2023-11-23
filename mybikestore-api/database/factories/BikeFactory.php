<?php

namespace Database\Factories;

use App\Enums\CategoryEnum;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bike>
 */
class BikeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'model' => fake()->company(),
            'description' => fake()->text(2000),
            'image' => null,
            'brand_id' => rand(0, 10),
            'category_id' => rand(0, 4),
            'quantity_in_stock' => rand(0, 6),
            'price' => rand(299, 1200),
            'battery_in_wh' => null,
            'range_in_km' => null,
        ];
    }


    public function setCategory(CategoryEnum $category)
    {
        return $this->state([
            'category_id' => Category::where('name', $category->value)->first()->id,
            'battery_in_wh' => $category === CategoryEnum::electricBike ? rand(500, 1000) : null,
            'range_in_km' => $category === CategoryEnum::electricBike ? rand(32, 160) : null
        ]);
    }
}
