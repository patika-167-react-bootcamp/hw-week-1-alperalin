Array.prototype.includesCi = function (sItem, index = 0) {
	// Orjinal Array'in ogeleri, Array'i bozmamak icin
	// String'ler lowercase edilip gecici bir array'a aktariliyor
	const tempArr = this.map((item) =>
		typeof item === 'string' ? item.toLowerCase() : item
	);

	// Array'de aranan degere type kontrolu yapiliyor.
	// Eger String ise lowercase ediliyor.
	sItem = typeof sItem === 'string' ? sItem.toLowerCase() : sItem;

	// includes methodu ile gecici array icerisinde
	// verilen deger araniyor
	return tempArr.includes(sItem, index);
};

// ORNEK 1
const arr1 = ['E', 'AhMeT', 'Ş', 'c', 'd'];
console.log('ORNEK 1', arr1.includesCi('ahmet'));

// ORNEK 2
const arr2 = ['MehMet', 'aHmet', 'Şess', 'c', 'd'];
console.log('ORNEK 2', arr2.includesCi('b'));

// ORNEK 3
const arr3 = ['MehMet', 'aHmet', 'Şess', 'c', 5];
console.log('ORNEK 3', arr3.includesCi(5));

// ORNEK 4
const arr4 = ['MehMet', 'aHmet', 'Çalıkuşu', 'c', 5];
console.log('ORNEK 4', arr4.includesCi('çalıkuşu'));

// ORNEK 5
const access = [
	'admin',
	'moderator',
	'superAdmin',
	'god',
	'companyUser',
	'plainUser',
];
console.log('ORNEK 5', access.includesCi('sUpeRaDmIN'));
