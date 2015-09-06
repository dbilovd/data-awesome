<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dataset extends Model
{
    //

    // ext mutator
    /**
     * Get
     */
    public function getExtAttribute() {
    	$filename = explode(".", $this -> file);
    	$ext = $filename[(count($filename) - 1)];
    	return $ext;
    }
}
