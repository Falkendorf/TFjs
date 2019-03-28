<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/p5.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/addons/p5.dom.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>
  <script src="sketch.js"></script>

</head>
<body>
  <div><a href="index.php">see the color-classification here...</a></div>
  <?php
    $data = $_POST["tIn"];
    //echo "Try to save this:". $data." !!!";
    $myfile = fopen("newfile.txt", "r") or die("Unable to open file!");
    $data1 = fread($myfile,filesize("newfile.txt"));
    fclose($myfile);
    if ($data!=""){
      //textDatei basteln
      $myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
      fwrite($myfile, $data1.",".$data);
      fclose($myfile);
      //echo "Complete the file!";
      //echo "The Data:".$data1;
    }
  ?>
  <div id="dom-target1" style="display: none;">
    <?php
    if ($data1!=""){
      echo ",".$data1.",";
    }
    ?>
  </div>
  	<div>
      <form action="data.php" method="post" enctype="multipart/form-data">
        <input type="submit" value="Upload DataSet" name="submit" onclick="submitAllData()">
        <input type="text" value="" name="tIn" id="dom-target" style="display: none;">
      </form>
    </div>



    <!-- This is the way to get the data.-->
    <!--<div id="dom-target" style="display: none;">-->
    <!--<?php
        //$output = "42"; //get Output out of the data file.
        //echo htmlspecialchars($output); output it.
    ?>-->
  <!--</div>-->
  <!--This is what i need to access it.
  <script>
      var div = document.getElementById("dom-target");
      var myData = div.textContent;
  </script>-->

</body>
</html>
