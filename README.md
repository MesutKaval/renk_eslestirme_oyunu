# Renk Eslestirme Oyunu

Tarayicida calisan, pastel renkli toplara sahip bir hafiza eslestirme oyunu. 4x4 grid uzerinde 8 renk ciftini esle ve en iyi sureyi yakala.

**Oyna:** [https://mesutkaval.github.io/renk_eslestirme_oyunu/](https://mesutkaval.github.io/renk_eslestirme_oyunu/)

## Ozellikler

- 4x4 grid, 8 farkli renk cifti
- Koyu arka plan uzerinde pastel toplar ve soft glow efektleri
- Animasyonlu parcacik arka plani (canvas)
- Ses efektleri (tiklama, eslestirme, kazanma)
- Milisaniye hassasiyetinde sure sayaci
- En iyi skor kaydi (sunucu modunda `scores.json`, tarayicide `localStorage`)
- Baslangic animasyonu (yanip sonme)
- Duzenleme modu (`E` tusu ile konum ve boyut ayarlama)

## Calistirma

### Tarayicida (basit)

`memory-game.html` dosyasini tarayicida ac. Skorlar `localStorage`'a kaydedilir.

### Sunucu ile (skor kaydi icin)

```bash
node server.js
```

Tarayicida `http://localhost:3000` adresine git. Skorlar `scores.json` dosyasina yazilir.

### Hizli baslatma (Windows)

```bash
oyun.bat
```

Sunucuyu baslatir ve tarayiciyi otomatik acar.

## Teknolojiler

- HTML, CSS, JavaScript (framework yok)
- Web Audio API (ses efektleri)
- Canvas API (parcacik animasyonu)
- Node.js (opsiyonel skor sunucusu)
