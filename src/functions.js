function getRandomArbitraryFloat(min, max) {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}

function getRandomArbitrary(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function collisionDetection(object1, object2) {
  if (
    (object1.y + object1.height) < object2.y ||
    object1.y > (object2.y + object2.height) ||
    (object1.x + object1.width) < object2.x ||
    object1.x > (object2.x + object2.width)
  ) {
    return false;
  }
  return true;
}

export {getRandomArbitraryFloat, getRandomArbitrary, collisionDetection}