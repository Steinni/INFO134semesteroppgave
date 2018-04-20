function calcDistance(lat1, long1, lat2, long2) {
x = Math.pow(lat2 - lat1, 2);
y = Math.pow(long2 - long1, 2);
d = x + y;
return Math.sqrt(d);
}
