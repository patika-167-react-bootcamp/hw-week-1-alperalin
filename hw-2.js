Array.prototype.includesCi = function (sItem, index = 0) {
	// Orjinal Array'in ogeleri, Array'i bozmamak icin
	// lowercase edilip gecici bir array'a aktariliyor
	const tempArr = this.map((item) => item.toLowerCase());

	// includes methodu ile gecici array icerisinde
	// verilen deger araniyor
	return tempArr.includes(sItem.toLowerCase(), index);
};

// ORNEK 1
const arr1 = ['E', 'AhMeT', 'Ş', 'c', 'd'];
console.log('ORNEK 1', arr1.includesCi('ahmet'));

// ORNEK 2
const arr2 = ['MehMet', 'aHmet', 'Şess', 'c', 'd'];
console.log('ORNEK 2', arr2.includesCi('b'));

// ORNEK 3
const access = [
	'admin',
	'moderator',
	'superAdmin',
	'god',
	'companyUser',
	'plainUser',
];
console.log('ORNEK 3', access.includesCi('sUpeRaDmIN'));
