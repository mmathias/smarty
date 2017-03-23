curl -X POST http://localhost:8001/lights/1 --data 'state=off'
sleep 1
curl -X POST http://localhost:8001/lights/2 --data 'state=off'
sleep 1
curl -X POST http://localhost:8001/lights/1 --data 'state=on&brightness=200'
sleep 1
curl -X POST http://localhost:8001/lights/2 --data 'state=on'
sleep 1
curl -X POST http://localhost:8001/lights/1 --data 'state=on&brightness=50'
sleep 1
curl -X POST http://localhost:8001/lights/2 --data 'state=on&brightness=0'
sleep 1
curl -X POST http://localhost:8001/lights/1 --data 'state=off'
sleep 1
curl -X POST http://localhost:8001/lights/2 --data 'state=off'
sleep 1
