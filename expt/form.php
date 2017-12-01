<?php
//    $json = $_POST['json'];

//     /* This doesn't work exactly right 
//      Writes to json file, but deletes old data 
//      Wasn't able to get any code from the internet working */
    
//    if (json_decode($json) != null)
//    {
//      $file = fopen('form_data.json','w+');
//      fwrite($file, $json);
//      fclose($file);
//    }
   
$data = $_POST['data'];
$data = explode("::", $data);
   
  // $data = array("Volvo", "BMW", "Toyota");

$observer = $data[0];
$file = fopen("form_data_" . $observer . ".csv","a");

 // foreach ($data as $line)
   // {
    fputcsv($file,$data);
  //  fputcsv($file, "\n")
 //   }

  fclose($file); 
  
  ?>
