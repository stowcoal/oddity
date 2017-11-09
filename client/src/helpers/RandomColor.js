const colors = [
  'Green', 'Orange', 'Blue', 'Red', 'Gold', 'Indigo'
];

const RandomColor = function(size) {
  if (size > 0){
    return Array(size).fill().map((_, i) => colors[i % colors.length]);
  }

  return colors[Math.floor(Math.random() * (colors.length - 1))];
};

export default RandomColor;
