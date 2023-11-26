<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    private array $brands = ['Batavus', 'Canyon', 'Diamondback', 'Gazelle', 'Giant', 'Hiboy', 'Jamis', 'Lekker', 'Linus', 'Marin', 'Prevelo', 'Priority', 'Pure', 'Rad Power', 'Retrospec', 'Ride1Up', 'Ridley', 'Specialized', 'Trek', 'VanMoof', 'Other'];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->brands as $brand) {
            Brand::factory(['name' => $brand])->create();
        }
    }
}
