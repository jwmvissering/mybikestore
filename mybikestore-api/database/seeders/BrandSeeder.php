<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    private array $brands = ['Lectric', 'Kona', 'Ride1Up', 'Marin', 'Rad Power', 'Giant', 'Trek', 'Cannondale', 'Bianchi', 'Specialized', 'Co-Op', 'Diamondback', 'Schwinn', 'Priority', 'Fuji', 'Tommaso', 'Sixthreezero', 'Santa Cruz', 'Raleigh', 'Cube', 'Alchemy', 'Orbea', 'Norco', 'Felt', 'Retrospec', 'Jamis', 'Firmstrong', 'Devinci', 'Ghost', 'Prevelo', 'Pure', 'Canyon', 'GT', 'Scott Sports', 'Ridley', 'BMC', 'MERIDA', 'Gazelle', 'Batavus', 'Pashley', 'Veloretti', 'VanMoof', 'Hiboy', 'Lekker', 'Linus'];

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
