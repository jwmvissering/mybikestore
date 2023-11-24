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
        $this->addDiamondBackBikes();
        $this->addGazelleBikes();
        $this->addGiantBikes();
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
            'wh_of_motor' => 500,
            'range_in_km' => 130,
        ])->setCategory(CategoryEnum::electricBike)->create();
    }

    private function addDiamondBackBikes(): void {
        $brandId = Brand::where('name', 'Diamondback')->first()->id;

        Bike::factory([
            'model' => 'Interurban 700c',
            'brand_id' => $brandId,
            'description' => 'Get around town in style on the Diamondback Interurban. With its clean lines and integrated rear rack, this urban bike features a lightweight aluminum frame and a blend of quality components that will take you where you need to go with a heightened sense of confidence. Due to supply availability components may be subject to change without notice. The lightweight 6061 T6 aluminum frame is designed with comfort and easy control in mind with its upright ergonomics for an easy riding position. It has front and rear fenders to guard you from dirt and road spray so you can arrive at your destination looking just as clean and distinguished as when you embarked on your ride.',
            'image' => '/uploads/fixtures/diamondback-interurban-700c.jpg',
            'price' => 356.97
        ])->setCategory(CategoryEnum::hybridBike)->create();

        Bike::factory([
            'model' => 'Nordet - Electric Bike (700c)',
            'brand_id' => $brandId,
            'description' => 'The ultimate blend of performance and power is the Diamondback Nordet Adult E-bike. This electric bike combines style, speed, and efficiency for an effortless commute or a leisurely ride. With a frame-integrated 14Ah battery, a 48V system, and a powerful Bafang mid-drive motor, the Nordet makes you feel unstoppable. The sporty frame geometry is perfect for riders looking for trendy ride. The Tektro hydraulic disc brakes and nine-speed Shimano drivetrain guarantee smooth shift and consistent stopping power. Whether it\'s commuting to work or a weekend adventure, the Diamondback Nordet E-bike is your better ride, amplified!',
            'image' => '/uploads/fixtures/diamondback-nordet.png',
            'price' => 2849.99,
            'wh_of_motor' => 14,
        ])->setCategory(CategoryEnum::electricBike)->create();
    }

    private function addGiantBikes(): void {
        $brandId = Brand::where('name', 'Giant')->first()->id;

        Bike::factory([
            'model' => 'REIGN ADVANCED PRO 29 1',
            'brand_id' => $brandId,
            'description' => 'Maestro rear suspension developed and tested under extreme conditions of Enduro World Series races. The trunnion mount shock has a longer stroke and smoother feel, and the Advanced Forged Composite upper rocker arm adds stiffness while lowering overall frame weight. The purpose-built composite frameset helps you ride aggressive descents and rail corners with confidence. Enduro-optimized head and seattube angles, plus a 170mm fork with 44mm offset, produce confident front-end handling. Larger 29-inch diameter wheels optimized to roll over rugged enduro terrain with improved balance and stability, giving you the momentum to crank up tough climbs and the confidence to fly on fast, technical descents.',
            'image' => '/uploads/fixtures/GiantReignAdvancedPro291_ColorAAmberGlow.jpg',
            'price' => 6999
        ])->setCategory(CategoryEnum::mountainBike)->create();
    }
}
