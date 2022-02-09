// NOTE: Folder icinde Folder olmayacak
const folders = [
	{
		id: 6,
		name: 'Klasör 2',
		files: [
			{ id: 21, name: 'foto.png' },
			{ id: 22, name: 'dosya.xls' },
		],
	},
	{
		id: 7,
		name: 'Klasör 3',
	},
	{
		id: 5,
		name: 'Klasör 1',
		files: [
			{ id: 17, name: 'profil.jpg' },
			{ id: 18, name: 'manzara.jpg' },
		],
	},
];

// Girilen dosyanin icerisinde bulundugu klasorun indeksini bulmak icin kullaniliyor.
function findFolderIndex(fileID) {
	const folderIndex = folders.findIndex((item) => {
		if (item.files && item.files.length > 0) {
			return item.files.find((file) => file.id === fileID);
		}
	});
	return folderIndex;
}

// Girilen dosyanin indeksini bulmak icin kullaniliyor.
function findFileIndex(folderIndex, fileID) {
	const fileIndex = folders[folderIndex].files.findIndex(
		(item) => item.id === fileID
	);
	return fileIndex;
}

// Move ve Copy fonksiyonlari %95 ayni islemleri yaptigi icin tek fonksiyon altina toplandi.
function moveOrCopyFile(type = 'move', fileID, folderID) {
	// Dogru ID kontrolu yapiliyor
	if (typeof fileID !== 'number' || typeof folderID !== 'number')
		return 'FileID ve FolderID giriniz';

	// Tasima/kopyalama yapilacak klasorun var olup olmadigi kontrol ediliyor.
	const receiverFolderIndex = folders.findIndex((item) => item.id === folderID);
	if (receiverFolderIndex === -1)
		return `${folderID}, ID numarasi ile tanimlanmis bir klasor bulunmuyor`;

	// Tasima/kopyalama yapilacak dosyanin, klasor indeksi aliniyor
	const folderIndex = findFolderIndex(fileID);

	// Mevcut klasor ile Tasima/kopyalama yapilacak klasor ayniysa hata mesaji donuluyor
	if (folderIndex === receiverFolderIndex)
		return `Ayni klasor icerisinde islem yapilamaz`;

	// Klasor indeksi -1 degilse islem yapiliyor
	if (folderIndex !== -1) {
		// Folder icerisindeki file indeksi aliniyor
		const fileIndex = findFileIndex(folderIndex, fileID);

		// Islemin turune gore splice veya slice kullaniliyor.
		const file = (type = 'move')
			? folders[folderIndex].files.splice(fileIndex, 1)
			: folders[folderIndex].files.slice(fileIndex, fileIndex + 1);

		// Tasima/kopyalama yapilacak klasor bir degiskene ataniyor.
		const receiverFolder = folders[receiverFolderIndex];

		// Dosya, klasor icerisine gonderiliyor.
		// Eger klasorde files bulunmuyorsa yeni files olusturuluyor
		receiverFolder['files']
			? receiverFolder['files'].push(file[0])
			: (receiverFolder['files'] = [file[0]]);

		// Islemin tamamlandigina dair mesaji donuluyor
		return `${fileID} ID numarali dosya, ${
			receiverFolder.id
		} ID numarali klasore ${type === 'move' ? 'tasindi' : 'kopyalandi'}.`;
	}

	// Eger herhangi bir islem yapilamamissa bu file id'nin yanlis
	// oldugunu belirtiyor ve hata mesaji donuluyor.
	return `${fileID}, ID numarasi ile tanimlanmis bir dosya bulunmuyor`;
}

// TODO: move fonksiyonu, girilen dosyayi girilen klasore tasiyacak
function move(fileID, folderID) {
	return moveOrCopyFile('move', fileID, folderID);
}
console.log(move(17, 5));

// TODO: copy fonksiyonu, girilen dosyayi girilen klasore kopyalayacak
function copy(fileID, folderID) {
	return moveOrCopyFile('copy', fileID, folderID);
}
console.log(copy(17, 5));

// TODO: remove fonksiyonu, girilen dosyayi silecek.
function remove(fileID) {
	// Dogru ID kontrolu yapiliyor
	if (typeof fileID !== 'number') return 'FileID giriniz';

	// Silenecek dosyanin bulundugu klasorun indeksi bulunuyor
	const folderIndex = findFolderIndex(fileID);

	// Klasor indeksi -1 degilse islem yapiliyor
	if (folderIndex !== -1) {
		// Dosya indeksi aliniyor
		const fileIndex = findFileIndex(folderIndex, fileID);

		// Dosya splice ile klasorden siliniyor
		folders[folderIndex].files.splice(fileIndex, 1);

		// Islemin tamamlandigina dair mesaji donuluyor
		return `${fileID} ID numarali dosya silinmistir.`;
	}

	// Klasor indeksi -1 donerse hata mesaji donuluyor
	return `${fileID} ID numarasi ile tanimlanmis bir dosya bulunmuyor`;
}
console.log(remove(17));

// TODO: removeFolder fonksiyonu, girilen klasoru butun icerigiyle silecek.
function removeFolder(folderID) {
	// Dogru ID kontrolu yapiliyor
	if (typeof folderID !== 'number') return 'FolderID giriniz';

	// Silinecek klasorun indeksi aliniyor
	const folderIndex = folders.findIndex((item) => item.id === folderID);

	// Klasor indeksi -1 degilse klasor siliniyor
	if (folderIndex !== -1) {
		// Klasor siliniyor
		folders.splice(folderIndex, 1);

		// Islemin tamamlandigina dair mesaji donuluyor
		return `${folderID}, ID numarali klasor silindi.`;
	}

	// Klasor indeksi -1 donerse hata mesaji donuluyor
	return `${folderID}, ID numarasi ile tanimlanmis bir klasor bulunmuyor`;
}
console.log(removeFolder(6));

// TODO: parentFolderOf fonksiyonu, girilen dosyanin icerisinde bulundugu klasorun id'sini donecek.
function parentFolderOf(fileID) {
	// Dogru ID kontrolu yapiliyor
	if (typeof fileID !== 'number') return 'FileID giriniz';

	// Dosyanin icerisinde oldugu klasorun indeksi aliniyor
	const folderIndex = findFolderIndex(fileID);

	// Klasor indeksi -1 degilse klasorun id'si donuluyor
	if (folderIndex !== -1) return folders[folderIndex]['id'];

	// Klasor indeksi -1 donerse hata mesaji donuluyor
	return `${fileID}, ID numarasi ile tanimlanmis bir dosya bulunmuyor`;
}
console.log(parentFolderOf(17));
