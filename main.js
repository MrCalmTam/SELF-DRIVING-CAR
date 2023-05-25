const carCanvas=document.getElementById("carCanvas");
carCanvas.width=200;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road=new Road(carCanvas.width/2,carCanvas.width*0.9);

const N=1;
const cars=generateCars(N);
let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.2);
        }
    }
}

/*
const traffic = [];

for (let i = 0; i >= -7000; i -= 200) {
  const car = new Car(road.getLaneCenter(i % 3), i, 30, 50, "DUMMY", 2, getRandomColor());
  traffic.push(car);
}
*/

const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-1100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-1300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-1300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-1500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-1700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-1700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-1900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-2100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-2100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-2300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-2500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-2700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-2700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-2900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-3100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-3300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-3300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-3500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-3700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-3900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-4100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-4300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-4300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-4500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-4500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-4700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-4700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-4900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-5100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-5300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-5300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-5500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-5700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-5700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-5900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-6100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-6100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-6300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-6500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-6700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-6700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-6900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-7100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-7300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-7300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-7500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-7700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-7900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-8100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-8300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-8300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-8500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-8500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-8700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-8700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-8900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-9100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-9300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-9300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-9500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-9700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-9700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-9900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-10100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-10300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-10300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-10500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-10700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-10700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-10900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-11100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-11300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-11300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-11500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-11700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-11900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-12100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-12300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-12300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-12500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-12500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-12700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-12700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-12900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-12100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-12300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-12300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-12500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-12700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-12700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-12900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-12100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-12100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-12300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-12500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-12700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-12700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-12900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-12100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-12300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-12300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-12500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-12700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-12900,30,50,"DUMMY",2,getRandomColor()),
];


// Kiểm tra xem trong localStorage có tồn tại trạng thái trọng số hay không
const bestBrainJSON = localStorage.getItem("bestBrain");

if (bestBrainJSON) {
  // Chuyển đổi trạng thái trọng số từ định dạng JSON thành đối tượng trọng số
  const bestBrain = JSON.parse(bestBrainJSON);

  // Gán trọng số cho mô hình Neural Network của bestCar
  bestCar.brain = bestBrain;
}

// Các khối code khác trong chương trình của bạn
animate();
function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars=[];
    for(let i=1;i<=N;i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return cars;
}

function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }
    bestCar=cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        ));

    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;

    carCtx.save();
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);

    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx);
    }
    carCtx.globalAlpha=0.2;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carCtx);
    }
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx,true);

    carCtx.restore();

    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx,bestCar.brain);
    requestAnimationFrame(animate);
}