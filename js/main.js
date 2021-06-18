var radius = 100; // radius of unit circle
    var pSize = 4; // size of pole and zero graphic
    var zSize = 4;
    // arrays index used to select specific pole or zero
    currentIndx = 0;
    // flags to know which one to be moved
    zeroFlag = false;
    poleFlag = false;
    //poles values related to the html coordinates
    var poles = []
    // saves poles values related to the html coordinates (btfdl mwgoda lma nms7 kol l poles)
    var tempPoles = [
        []
    ]
    // usable poles values -1 -> 1 (hnst5dmha f l calculations)
    var Truepoles = [
        [0.75, 0.34],
        [0.75, -0.34]
    ]
    //zeros values related to the html coordinates
    var zeros = []
    // saves zeros values related to the html coordinates (btfdl mwgoda lma nms7 kol l zeros)
    var tempZeros = [
        []
    ]
    // usable zeros values -1 -> 1 (hnst5dmha f l calculations)
    var Truezeros = [
        [1, 0]
    ]

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    Draw();

    function Draw() {
        ctx.clearRect(0, 0, c.width, c.height);

            var pad = (c.width - 2 * radius) / 2; // padding on each side

            // unit circle
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.arc(radius + pad, radius + pad, radius, 0, 2 * Math.PI);
            ctx.stroke();
            // y axis
            ctx.beginPath();
            //ctx.lineWidth="1";
            ctx.strokeStyle = "lightgray";
            ctx.moveTo(radius + pad, 0);
            ctx.lineTo(radius + pad, c.height);
            ctx.font = "italic 8px sans-serif";
            ctx.fillText("Imaginary", radius + pad + 2, pad - 2);

            // x axis
            ctx.moveTo(0, radius + pad);
            ctx.lineTo(c.width, radius + pad);
            ctx.fillText("Real", radius + radius + pad + 2, radius + pad - 2);
            ctx.strokeStyle = "lightgray";
            ctx.stroke(); // Draw it
            
            var idx;

            for (idx = 0; idx < poles.length; idx++) {
                var x = poles[idx][0] - 10;
                var y = poles[idx][1] - 10;
                ctx.beginPath();
                ctx.moveTo(x - pSize , y - pSize );
                ctx.lineTo(x + pSize , y + pSize );
                ctx.moveTo(x - pSize , y + pSize );
                ctx.lineTo(x + pSize , y - pSize );
                ctx.strokeStyle = "blue";
                ctx.stroke();
                
            };
            for (idx = 0; idx < zeros.length; idx++) {
                var x = zeros[idx][0] - 10;
                var y = zeros[idx][1] - 10;

                Truezeros.push([(x - radius) / radius, (radius - y) / radius]);
                
                ctx.beginPath();
                ctx.arc(x , y , zSize, 0, 2 * Math.PI);
                ctx.strokeStyle = "red";
                ctx.stroke();
                

            };
        };

        function AddPoles() {
            var x = radius + (radius * 0.75) ;
            var y = radius - (radius * 0.34) ;
            poles.push([x + 32,y + 32]);
            Draw();
        };

        function AddZeros() {
            var x = radius + (radius * 0) ;
            var y = radius - (radius * 0) ;
            zeros.push([x + 32,y + 32]);
            Draw();
        };
    
        function showCoords(event) {
            var x = event.offsetX;
            var y = event.offsetY;
            if (zeroFlag){
                zeros[currentIndx][0] = x
                zeros[currentIndx][1] = y
                tempZeros = zeros
                Draw()
            }
            else if(poleFlag){
                poles[currentIndx][0] = x
                poles[currentIndx][1] = y
                tempPoles = poles
                Draw()
            }
        }

        function clearZeros() {
            zeros = [];
            Draw()

        };
        function clearSelected(){
            if (zeroFlag){
                zeros.splice(currentIndx,1);
            }
            else if(poleFlag){
                poles.splice(currentIndx,1);
            }
            Draw();
            };
        
        function clearPoles() {
            poles = [];
            Draw();
        };

        function clearAll() {
            poles = [];
            zeros = [];
            Draw();
        };
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);
        google.charts.setOnLoadCallback(drawChart_1);
        google.charts.setOnLoadCallback(drawChart_2);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Sales', 'Expenses'],
          ['2004',  1000,      400],
          ['2005',  1170,      460],
          ['2006',  660,       1120],
          ['2007',  1030,      540]
        ]);

        var options = {
          title: 'Poles & Zeros',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }
      function drawChart_1() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Sales', 'Expenses'],
          ['2004',  1000,      400],
          ['2005',  1170,      460],
          ['2006',  660,       1120],
          ['2007',  1030,      540]
        ]);

        var options = {
          title: 'Poles & Zeros',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart_1'));

        chart.draw(data, options);
      }
      function drawChart_2() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Sales', 'Expenses'],
          ['2004',  1000,      400],
          ['2005',  1170,      460],
          ['2006',  660,       1120],
          ['2007',  1030,      540]
        ]);

        var options = {
          title: 'Poles & Zeros',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart_2'));

        chart.draw(data, options);
      }
      

      