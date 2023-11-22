<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Brand extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Get the bikes for the brand.
     */
    public function bikes(): HasMany
    {
        return $this->hasMany(Bike::class);
    }
}
