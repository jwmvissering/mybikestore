<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bike extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $casts = [
        'quantity_in_stock' => 'integer',
        'price' => 'float',
        'wh_of_motor' => 'integer',
        'range_in_km' => 'integer'
    ];

    /**
     * Get the category that belongs to the bike.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the brand that belongs to the bike.
     */
    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }
}
