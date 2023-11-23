<?php

namespace Database\Seeders;

use App\Enums\CategoryEnum;
use App\Models\Bike;
use App\Models\Brand;
use Illuminate\Database\Seeder;

class BikeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->addGazelleBikes();
    }

    private function addGazelleBikes(): void {
        $brandId = Brand::where('name', 'Gazelle')->first()->id;

        Bike::factory([
            'model' => 'Esprit',
            'brand_id' => $brandId,
            'description' => 'The Esprit has everything you need from an everyday bike. The aluminium frame and the robust parts can withstand a knock. The contemporary styling features an integrated headlight, concealed cables and high rims. There are plenty of options for you to choose from.',
            'image' => '/uploads/fixtures/gazelle-esprit.png',
            'price' => 599
        ])->setCategory(CategoryEnum::cityBike)->create();

        Bike::factory([
            'model' => 'Medeo T10 HMB',
            'brand_id' => $brandId,
            'description' => 'You are sporty, versatile and stylish. Just like the Medeo T10 HMB. With its derailleur system, beautiful styling and powerful motor, it\'s as versatile as you are. Commuting to work quickly, going to the city in style or relaxed riding on a rural bicycle route: The versatile and sporty Medeo T10 HMB is up for anything. Its clever weight distribution, wide tyres and ergonomic handlebar grips offer all the riding comfort you could want, and on top that the powerful motor always provides a nice helping hand when you need it. When you look at it, you may not immediately notice that the Medeo T10 HMB is an e-bike. The mid-drive motor is integrated into the frame design and the battery is housed in the robust down tube. This not only gives it a nice appearance, it also ensures good riding characteristics. How? The low position of the motor and battery, in the centre of the bike, lowers the centre of gravity. You therefore experience more stability and better road holding.',
            'image' => '/uploads/fixtures/gazelle-medeo-t10-hmb.png',
            'price' => 2799,
            'battery_in_wh' => 500,
            'range_in_km' => 130,
        ])->setCategory(CategoryEnum::electricBike)->create();
    }
}
