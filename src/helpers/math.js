const calculateSlope = (coord1, coord2) => {
  const [x1, y1] = coord1;
  const [x2, y2] = coord2;

  return (y2 - y1) / (x2 - x1);
};

const findAngle = (slope1, slope2) => {
  const rads = Math.PI - Math.abs(Math.atan(slope1) - Math.atan(slope2));
  console.log(rads * (180 / Math.PI));
  const ang = 180 - Math.abs(Math.atan(slope1) - Math.atan(slope2));
  console.log(ang);
  return rads * (180 / Math.PI);
};

const findAngle2 = (adj1, adj2, farthestLength) => {
  const target = (adj1 ** 2 + adj2 ** 2 - farthestLength ** 2) / (2 * adj1 * adj2);
  const result = Math.acos(target);
  return result;
};

const calculateDistance = (coord1, coord2) => {
  const [x1, y1] = coord1;
  const [x2, y2] = coord2;

  const dist = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

  // returns a value that is 1/8 light years
  return dist * 8;
};

const degreesToRad = (degrees) => {
  return (degrees * Math.PI) / 180;
};

const radToDegrees = (rad) => {
  return (rad * 180) / Math.PI;
};
const findUnknownLength = (knownLength, knownRadian, targetAngle) => {
  // lastAngle represents the angle from enemy to home and to target vertex

  return (knownLength / Math.sin(knownRadian)) * Math.sin(targetAngle);
};

const findUnknownAngle = (knownLength, knownRadian, targetLength) => {
  return Math.asin((Math.sin(knownRadian) / knownLength) * targetLength);
};

const timeToOutOfRange = ({ home, enemy, target, scanningRange, data }) => {
  const stars = JSON.parse(data);

  const starData = Object.keys(stars).reduce((a, b) => {
    a[stars[b].n] = stars[b];
    return a;
  }, {});

  const homeCoord = [starData[home].x, starData[home].y];
  const enemyCoord = [starData[enemy].x, starData[enemy].y];
  const targetCoord = [starData[target].x, starData[target].y];

  // const homeToEnemySlope = calculateSlope(homeCoord, enemyCoord);
  // const homeToTargetSlope = calculateSlope(homeCoord, targetCoord);
  // const targetToEnemySlope = calculateSlope(targetCoord, enemyCoord);

  const homeToTargetLength = calculateDistance(homeCoord, targetCoord);
  const homeToEnemyLength = calculateDistance(homeCoord, enemyCoord);
  const enemyToTargetLength = calculateDistance(enemyCoord, targetCoord);

  const homeRadians = findAngle2(homeToTargetLength, homeToEnemyLength, enemyToTargetLength);
  const targetRadians = findAngle2(homeToTargetLength, enemyToTargetLength, homeToEnemyLength);
  const enemyRadians = findAngle2(homeToEnemyLength, enemyToTargetLength, homeToTargetLength);

  const homeAngle = radToDegrees(homeRadians);
  const targetAngle = radToDegrees(targetRadians);
  const enemyAngle = radToDegrees(enemyRadians);

  const mysteryRadians = findUnknownAngle(scanningRange, homeRadians, homeToEnemyLength);

  // because there are two possible triangles, we need to find which result is correct

  const mysteryAngle = radToDegrees(mysteryRadians);
  const mysteryAngle2 = 180 - mysteryAngle;
  const mysteryRadians2 = degreesToRad(mysteryAngle2);

  const lastAngle = 180 - homeAngle - mysteryAngle;
  const lastAngle2 = 180 - homeAngle - mysteryAngle2;

  const lastRad = degreesToRad(lastAngle);
  const lastRad2 = degreesToRad(lastAngle2);

  const result1 = findUnknownLength(scanningRange, homeRadians, lastRad);
  const result2 = findUnknownLength(scanningRange, homeRadians, lastRad2);

  console.log({
    homeAngle,
    enemyAngle,
    targetAngle,
    mysteryAngle,
    mysteryAngle2,
    mysteryRadians,
    mysteryRadians2,
    lastAngle,
    lastAngle2,
  });
  console.log({
    homeToTargetLength,
    homeToEnemyLength,
    enemyToTargetLength,
  });

  console.log('These three should match');
  console.log(enemyToTargetLength / Math.sin(homeRadians));
  console.log(homeToEnemyLength / Math.sin(targetRadians));
  console.log(homeToTargetLength / Math.sin(enemyRadians));
  console.log('-----------------------------');

  console.log('Two should match');
  console.log(scanningRange / Math.sin(homeRadians));
  console.log(homeToEnemyLength / Math.sin(mysteryRadians));
  console.log('-----------------------------');

  console.log({ result1, result2 });
  // length 1 / sin(angle1) === length 2 / sin(angle2)
  // scanning range / sin(homeRadians) === x / sin(enemyAngle)

  return JSON.stringify({ result1, result2 });
};

// timeToOutOfRange({ home: 'Raw', enemy: 'Ashlesha', target: 'Yum', scanningRange: 5 });
export default timeToOutOfRange;
