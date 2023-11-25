<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    private array $brands = ['Batavus', 'Canyon', 'Diamondback', 'Gazelle', 'Giant', 'Hiboy', 'Jamis', 'Lekker', 'Linus', 'Marin', 'MERIDA', 'Prevelo', 'Priority', 'Pure', 'Rad Power', 'Raleigh', 'Retrospec', 'Ride1Up', 'Ridley', 'Schwinn', 'Scott Sports', 'Specialized', 'Tommaso', 'Trek', 'VanMoof', 'Other'];

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
