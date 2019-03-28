<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/p5.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/addons/p5.dom.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>
  <script src="sketch0.js"></script>

</head>
<body>
    <div><a href="data.php">generate more data here...</a></div>
  	<div id="dom-target" style="display: none;">
      <?php
      $myfile = fopen("newfile.txt", "r") or die("Unable to open file!");
      $data = ",".fread($myfile,filesize("newfile.txt"));
      echo $data.",";
      fclose($myfile);
          //$output = "42"; //get Output out of the data file.
          //echo htmlspecialchars($output); output it.
      ?>
    </div>
    <!-- This is the way to get the data.-->
    <!--<div id="dom-target" style="display: none;">-->
    <!--
        //$output = "42"; //get Output out of the data file.
        //echo htmlspecialchars($output); output it.
    -->
  <!--</div>-->
  <!--This is what i need to access it.
  <script>
      var div = document.getElementById("dom-target");
      var myData = div.textContent;
  </script>-->

</body>
</html>
