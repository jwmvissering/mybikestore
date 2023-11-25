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
        $this->addBatavusBikes();
        $this->addDiamondBackBikes();
        $this->addGazelleBikes();
        $this->addGiantBikes();
        $this->addSpecializedBikes();
        $this->addLinusBikes();
        $this->addVanMoofBikes();
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
            'model' => 'Reign advanced pro 29 1',
            'brand_id' => $brandId,
            'description' => 'Maestro rear suspension developed and tested under extreme conditions of Enduro World Series races. The trunnion mount shock has a longer stroke and smoother feel, and the Advanced Forged Composite upper rocker arm adds stiffness while lowering overall frame weight. The purpose-built composite frameset helps you ride aggressive descents and rail corners with confidence. Enduro-optimized head and seattube angles, plus a 170mm fork with 44mm offset, produce confident front-end handling. Larger 29-inch diameter wheels optimized to roll over rugged enduro terrain with improved balance and stability, giving you the momentum to crank up tough climbs and the confidence to fly on fast, technical descents.',
            'image' => '/uploads/fixtures/GiantReignAdvancedPro291_ColorAAmberGlow.jpg',
            'price' => 6999
        ])->setCategory(CategoryEnum::mountainBike)->create();
    }

    private function addSpecializedBikes(): void {
        $brandId = Brand::where('name', 'Specialized')->first()->id;

        Bike::factory([
            'model' => 'Roll 2.0 Bike',
            'brand_id' => $brandId,
            'description' => 'All barn-burner and no benchwarmer, the Rockhopper Sport throws out the playbook when it comes to putting performance points on the board while playing some serious defense on behalf of your wallet. A heart of gold, presented in our lightweight yet durable Premium A1 Aluminum, the Rockhopper’s butted aluminum frame features hydroformed top and downtubes in order to keep weight low and strength high, all while providing increased standover clearance, slick internal cable routing and dropper-post compatibility.',
            'image' => '/uploads/fixtures/specialized.png',
            'price' => 594.99
        ])->setCategory(CategoryEnum::hybridBike)->create();
    }

    private function addLinusBikes(): void {
        $brandId = Brand::where('name', 'Linus')->first()->id;

        Bike::factory([
            'model' => 'Dutchi 3-speed',
            'brand_id' => $brandId,
            'description' => 'Following the geometry of a classic Dutch bike, the Linus Dutchi puts you in the bolt-upright position favoured by European riders from Amsterdam to Copenhagen. It\'s super comfortable on short rides under 10km and lets you take in the sights and sounds of the world around you. Loaded with features, the Dutchi 3-Speed at its heart is a strong hi-ten steel frame with durable double-walled wheels made for cities. The bike comes fully equipped with fenders, kickstand and a beautiful high-polish rear rack. The wheels use heavy duty 13 gauge spokes on the rear to handle potholes and heavy panniers. Finally, the 3-speed internal gear hub gives a nice range of gears for flatter or mildly sloped terrain, all in a sealed package that protects it from rain and foul weather. Designed in California, the Dutchi is not quite as robust as our European produced Achielle or Fahrradmanufaktur bikes but is the perfect bike if you ride primarily in the Spring, Summer or Fall. However, we do recommend indoor overnight storage to prevent issues like corrosion.',
            'image' => '/uploads/fixtures/linus-dutchi.png',
            'price' => 899.99
        ])->setCategory(CategoryEnum::cityBike)->create();
    }

    private function addVanMoofBikes(): void {
        $brandId = Brand::where('name', 'VanMoof')->first()->id;

        Bike::factory([
            'model' => 'S5',
            'brand_id' => $brandId,
            'description' => 'Rule the road with the VanMoof S5. Perfect for controlled cruising and longer rides. Revolutionary riding made easy. Throw away the manual, the Halo Ring Interface has got you covered. LED light rings on your handlebars communicate all the information you need clearly within your eye-line, so your focus is never off the road ahead. Mount your phone to the handlebars and use the VanMoof app while you’re on the move. Track your current speed, ride duration, and distance while you ride – and look back at your ride history to see how many kilometers you’ve crunched that month. Oh, and you can keep your phone nicely charged up here, too.',
            'image' => '/uploads/fixtures/vanmoof-s5.jpg',
            'price' => 5480,
            'wh_of_motor' => 487,
            'range_in_km' => 150
        ])->setCategory(CategoryEnum::electricBike)->create();

        Bike::factory([
            'model' => 'A5',
            'brand_id' => $brandId,
            'description' => 'Play the street with the VanMoof A5. Perfect for pit stops and agile city rides. Revolutionary riding made easy. Throw away the manual, the Halo Ring Interface has got you covered. LED light rings on your handlebars communicate all the information you need clearly within your eye-line, so your focus is never off the road ahead. Mount your phone to the handlebars and use the VanMoof app while you’re on the move. Track your current speed, ride duration, and distance while you ride – and look back at your ride history to see how many kilometers you’ve crunched that month. Oh, and you can keep your phone nicely charged up here, too.',
            'image' => '/uploads/fixtures/vanmoof-a5.jpg',
            'price' => 5480,
            'wh_of_motor' => 487,
            'range_in_km' => 150
        ])->setCategory(CategoryEnum::electricBike)->create();
    }

    private function addBatavusBikes(): void {
        $brandId = Brand::where('name', 'Batavus')->first()->id;

        Bike::factory([
            'model' => 'Mambo',
            'brand_id' => $brandId,
            'description' => 'Everything has been thought of when designing this bicycle. The strong frame is designed so that this bike can handle extra weight. No less than 150 kilos for the entire bicycle. The rear carrier can handle a weight of up to 35 kilos. You can enrich this all-rounder with several accessories at the same time. A child seat front and rear, bicycle bags and a basket to carry extra luggage. And the design keeps you agile and compact. This bicycle has Batavus Vizi lighting. This lighting automatically provides \'high beam\' in dark weather or in the evening. This way you are optimally visible to others and you see more, without having to think about it yourself.',
            'image' => '/uploads/fixtures/batavus-mambo.png',
            'price' => 989.99
        ])->setCategory(CategoryEnum::cityBike)->create();

        Bike::factory([
            'model' => 'Finez E-go Power Exclusive',
            'brand_id' => $brandId,
            'description' => 'The Batavus Finez E-go® Power Exclusive is the top model of the Finez series. This very complete electric city bike is equipped with every luxury. It has an integrated battery, belt drive, 8 gears, disc brakes and a completely new lighting set. With the Batavus Finez E-go® you have a top e-bike that you can use for every ride! Because the Finez E-go® Power Exclusive is equipped with a belt drive, this electric bicycle is even quieter, so you can optimally enjoy every ride. Moreover, a belt drive lasts up to three times as long as a regular chain and you no longer have to worry about dirt or grease on your pants! Handy, right?',
            'image' => '/uploads/fixtures/batavus-finez.png',
            'price' => 4480,
            'wh_of_motor' => 500,
            'range_in_km' => 148
        ])->setCategory(CategoryEnum::electricBike)->create();
    }
}
