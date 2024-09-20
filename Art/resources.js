

var currentVideoId = null;

function searchVideos() {
    var keyword = $('#keyword').val();
    var apiKey = 'AIzaSyA7PG7CkTNYpuVlvjtOl3WW5ZvS1TS0-g8'; 

    $.get(
        'https://www.googleapis.com/youtube/v3/search', {
            part: 'snippet',
            q: keyword,
            type: 'video',
            maxResults: 10,
            order: 'relevance',
            key: apiKey
        },
        function (data) {
            var shuffledVideos = shuffle(data.items);

            displayResults(shuffledVideos);
        }
    );
}

function displayResults(videos) {
    var resultsContainer = $('#results');
    resultsContainer.empty();

    if (videos.length === 0) {
        resultsContainer.append('<p>No videos found.</p>');
    } else {
        videos.forEach(function (video, index) {
            var videoTitle = video.snippet.title;
            var videoId = video.id.videoId;
            var thumbnailUrl = video.snippet.thumbnails.default.url;

            if (!containsShorts(videoTitle)) {
                resultsContainer.append(
                    '<div class="result-item">' +
                        '<img class="thumbnail" src="' + thumbnailUrl + '" alt="Video Thumbnail" onclick="playVideo(\'' + videoId + '\')">' +
                        '<div class="result-details">' +
                            '<p class="title">' + videoTitle + '</p>' +
                            '<button class="play-button" onclick="playVideo(\'' + videoId + '\')">Play</button>' +
                        '</div>' +
                    '</div>'
                );
            }
        });
    }
}

function playVideo(videoId) {
    if (currentVideoId) {
        $('#player').empty();
    }

    var iframe = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>';

    $('#player').append(iframe);

    currentVideoId = videoId;
}

function shuffle(array) {
    var currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

function containsShorts(title) {
    // Check if the title contains '#Shorts' or 'shorts'
    return title.toLowerCase().includes('#shorts') || title.toLowerCase().includes('shorts') || title.toLowerCase().includes('short');
}

function displayInfo(option) {
    const heading = document.getElementById('selectedTopic');
    heading.textContent = option;
   
    const infoData = generateInfoData(option);

   
    const infoContent = document.getElementById('infoContent');
    infoContent.innerHTML = '';

    infoData.forEach(data => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.innerHTML = `
            <img src="${data.logo}" alt="${data.name}" class="logo">
            <p>${data.name}</p>
        `;
        infoContent.appendChild(gridItem);
    });
}

function generateInfoData(option) {
    
    switch (option) {
        case 'Art Reference':
            return [
                { name: 'DeviantArt', logo: 'https://play-lh.googleusercontent.com/IUcqE41VIxbZexis7tPuWMuGD_4mQCPx4cuO5z1ZrgzeMqRu1-uU720TtznqPWS69Jk=w240-h480-rw' },

                { name: 'Pinterest', logo: 'https://up.yimg.com/ib/th?id=OIP.V5RoSjcG3SmfjaGnf8MyFwHaHa&pid=Api&rs=1&c=1&qlt=95&w=109&h=109' },
            ];
      
        case 'Calligraphy and Handwriting':
            return [
                { name: 'Calligrapher', logo: 'https://play-lh.googleusercontent.com/RtKXFQRZQA55XfwB8YMteCnMOKbr1S7y-lNOuM6tZRP5_1EyQ7ZfmOZ_hW2EqxSN_Zr3=w240-h480-rw' },
                { name: 'Lettering Daily ', logo: 'https://imgs.search.brave.com/QN685ugPdzWiHpIEXFbyd4AM_YalYp6RZ9leo5T83-o/rs:fit:200:200:1/g:ce/aHR0cHM6Ly95dDMu/Z29vZ2xldXNlcmNv/bnRlbnQuY29tL3l0/Yy9BSWRyb19teDd3/b0dteWc1a1NMYVR1/SC10WFRXZGg2Qngt/blRMVEV0NjVVZT1z/OTAwLWMtay1jMHgw/MGZmZmZmZi1uby1y/ag' }
            ];
        case 'Animation and Comics':
            return [
                { name: 'FlipaClip', logo: 'https://play-lh.googleusercontent.com/bKq4X_rvgBB7W8VZvVh3dc7g6W9QkGUlERDOc12PEo27hMvg1TzbjHBoeleINtXmxtI_=s48-rw' },
                { name: 'Adobe Animate ', logo: 'https://up.yimg.com/ib/th?id=OIP.EgMzytRHTjmfsMeK4_xZ4QHaHa&pid=Api&rs=1&c=1&qlt=95&w=112&h=112' },          
                { name: 'Clip Studio Paint ', logo: 'https://s.yimg.com/fz/api/res/1.2/tFWxut.bPQFo2rRrRN.kEw--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI2MDtxPTgwO3c9MjYw/https://s.yimg.com/zb/imgv1/009af322-7ee4-3f33-a69f-a25f72a6a2a4/t_500x300' }
            ];

        case 'Sketching':
            return [
                { name: 'Concepts', logo: 'https://play-lh.googleusercontent.com/8V1fwYBnseZxjoyPtG1Xk8pUH_L6e6IWQqBuvW9DIoG72rackUixnuSNdXRYbC2zSg=s48-rw' },
                { name: 'Adobe Illustrator Draw ', logo: 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/15/f3/d1/15f3d121-d729-7d7b-1ad2-208cc0e512c6/AppIcon-0-1x_U007emarketing-0-7-0-sRGB-85-220.png/246x0w.webp' }
            ]
        case 'Pixel Art':
            return [
                { name: 'Pixly', logo: 'https://play-lh.googleusercontent.com/_Br6bZYNnVS_wPy2h8uU8D-I_wB6li5ClwOoot-eSYeWqMp9MsLuhddTdbk5ozt0PU8=w240-h480-rw' },
                { name: 'Pixaki', logo: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/d7/d9/16/d7d916b9-c6aa-8601-31b8-ee39e36c642a/AppIconPro-0-0-1x_U007emarketing-0-2-85-220.png/246x0w.webp' },
            ]
        case 'Painting':
            return [
                { name: 'Adobe Fresco', logo: 'https://tse2.mm.bing.net/th?id=OIP.j8ahDtLr2zWFeT5SQiG4FgHaHI&pid=Api&P=0&h=220' },
                { name: 'ArtRage', logo: 'https://tse3.mm.bing.net/th?id=OIP.El82GEkaoLWgfEMSNP0SKwAAAA&pid=Api&P=0&h=220' },
                { name: 'Krita', logo: 'https://s.yimg.com/fz/api/res/1.2/PLAku1gVocKMfJW8JpimlQ--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI2MDtxPTgwO3c9MjYw/https://s.yimg.com/zb/imgv1/7b3a936d-35ad-312d-afd6-f260220df399/t_500x300' }
            ]
        case 'Doodling':
            return [
                { name: 'Drawing Desk', logo: 'https://play-lh.googleusercontent.com/cZXYPm7UflaU2775GtOHbtdX8SDxIUPyvPvuzCZFdsoZwbMGKeNyBjVDKNIUMKtr0pIq=w240-h480-rw' },
                { name: 'Doodle Buddy', logo: 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/f4/2f/fc/f42ffc4e-1903-a64c-dcb4-d98c914cdc74/AppIcon_Classic-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/246x0w.webp' },
                { name: 'ArtFlow', logo: 'https://up.yimg.com/ib/th?id=OIP.qVTVT5WIiu6LFy3XnvCd2gHaHa&pid=Api&rs=1&c=1&qlt=95&w=110&h=110' }
            ]
        case '3D Modeling':
            return [
                    { name: 'Blender', logo: 'https://imgs.search.brave.com/fQtv8TyxbhXHZtoatIKLhkAkCrCMlfVznG99iKNHp10/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/bmljZXBuZy5jb20v/cG5nL2RldGFpbC8z/NDMtMzQzNjM0M19i/bGVuZGVyLWxvZ28t/cG5nLnBuZw' },
                    { name: 'SketchUp', logo: 'https://imgs.search.brave.com/eg2ITdtE2FSwS1HU8uClzLND3yaFFDX1rfciqwlUG2Y/rs:fit:200:200:1/g:ce/aHR0cHM6Ly95dDMu/Z29vZ2xldXNlcmNv/bnRlbnQuY29tL1l0/WXpxQWdVUlNXRUlE/SUpBaUhTSkJwMXRD/dFNFeVNySFhZcFRf/ZjJoWEx0UVg0TUl0/LVROMXRzMTdFb2c0/Q2JxS2JvS0NRRi1u/Yz1zOTAwLWMtay1j/MHgwMGZmZmZmZi1u/by1yag' }
                ]
        case 'Tutorials':
            return [
                        { name: 'Skillshare', logo: 'https://play-lh.googleusercontent.com/Lfh8g5kPONfSNL7R4s8itnMMdj3lhmHU9tb4gp7eoOaXkJo0dOcwB6iWPdNGZMRDMVs=w240-h480-rw' },
                        { name: 'Drawspace', logo: 'https://tse3.mm.bing.net/th?id=OIP.PRdz0w_HsfIHhtOJtqW6LAAAAA&pid=Api&P=0&h=220' },
                        { name: 'Sketchbook', logo: 'https://play-lh.googleusercontent.com/NIhaPLVMl69snWk7IOWADeBwU-8FG5VL1q41_fmd6TVa4FEIqXQw3Ar3BovrXvza2Q=w240-h480-rw' }

                    ]
        
        case 'Community':
            return [
                { name: 'DeviantArt', logo: 'https://play-lh.googleusercontent.com/IUcqE41VIxbZexis7tPuWMuGD_4mQCPx4cuO5z1ZrgzeMqRu1-uU720TtznqPWS69Jk=w240-h480-rw' },
                { name: 'ArtStation', logo: 'https://play-lh.googleusercontent.com/RUkxkpZLufZ_cVXdaEVm61g_F4YBwhED3N9POkVt7lMw0tU5ZB62XYeW42WFvJvM0Jg=w240-h480-rw' }
            ]

    
        
        default:
            return [];
    }
}

