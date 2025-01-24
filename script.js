let map;
let markers = [];

function initMap() {
    // 拓殖大学八王子キャンパス
    const center = { lat: 35.418190, lng: 138.871845 };

    // Google Mapを生成
    const map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 13,
        styles: [
                     {
                      "featureType": "all",
                      "elementType": "geometry",
                      "stylers": [
                          { "color": "#e0efef" }
                      ]
                  },
                  {
                      "featureType": "all",
                      "elementType": "labels.text.fill",
                      "stylers": [
                          { "color": "#000000" },
                          { "lightness": 20 }
                      ]
                  },
                  {
                      "featureType": "all",
                      "elementType": "labels.text.stroke",
                      "stylers": [
                          { "color": "#ffffff" },
                          { "lightness": -30 },
                          { "weight": 2 }
                      ]
                  },
                  {
                      "featureType": "landscape",
                      "elementType": "geometry",
                      "stylers": [
                          { "color": "#e0efef" },
                          { "lightness": 20 }
                      ]
                  },
                  {
                      "featureType": "poi",
                      "elementType": "geometry",
                      "stylers": [
                          { "color": "#c5e3bf" },
                          { "lightness": 21 }
                      ]
                  },
                  {
                      "featureType": "poi.park",
                      "elementType": "geometry",
                      "stylers": [
                          { "color": "#bde6ab" },
                          { "lightness": 20 }
                      ]
                  },
                  {
                      "featureType": "road",
                      "elementType": "geometry",
                      "stylers": [
                          { "color": "#ffffff" },
                          { "lightness": 20 }
                      ]
                  },
                  {
                      "featureType": "road.highway",
                      "elementType": "geometry",
                      "stylers": [
                          { "color": "#f8c967" }
                      ]
                  },
                  {
                      "featureType": "water",
                      "elementType": "geometry",
                      "stylers": [
                          { "color": "#a4d3e3" }
                      ]
                  },
                   {
                       "featureType": "poi.government" ,
                       "stylers": [
                           {"visibility": "off"}
                           ]
                   },
                   {
                       "featureType": "poi.medical" ,
                       "stylers": [
                           {"visibility": "off"}
                           ]
                   },
                   {
                       "featureType": "poi.place_of_worship" ,
                       "stylers": [
                           {"visibility": "off"}
                           ]
                   },
                   {
                       "featureType": "poi.school" ,
                       "stylers": [
                           {"visibility": "off"}
                           ]
                   }
                   ]
                });


    
    // マーカーの座標とマーカーの全天球画像
    const markerData = [
        { position: { lat: 35.428597, lng: 138.858912 }, page: [
                'sky1_80m.html'
            ]
        },
        { position: { lat: 35.422331, lng: 138.860401 }, page:  [
                'sky1_30m.html'
             ]
     },
         { position: { lat: 35.422429, lng: 138.890768 }, page:  [
                'sky1_20m.html',
             ]
     },
         { position: { lat: 35.427856, lng: 138.851409 }, page:  [
                'sky1_50m.html'',
                '',
                '',
                '',
                ''
             ]
    },
              { position: { lat: 35.408981, lng: 138.877194 }, page:  [
                'sky1_120m.html'',
                '',
                '',
                '',
                ''
             ]
    },
         { position: { lat: 35.412773, lng: 138.889561 }, page:  [
                '',
                '',
                '',
                '',
                ''
             ]
         },
         { position: { lat: 35.422736, lng: 138.881805 }, page:  [
                '',
                '',
                '',
                '',
                ''
             ]
         }
    ];

        // マーカーを設置し、インフォウィンドウを作成
        for (let i = 0; i < markerData.length; i++) {
          const marker = new google.maps.Marker({
            position: markerData[i].position,
            map: map,
            title: 'Point ' + (i + 1)
          });

          // インフォウィンドウに5つのボタンを追加
        attachInfoWindow(marker, markerData[i].page);

        markers.push(marker);
        }

        // ストリートビューのON/OFFでマーカーの表示を切り替え
        google.maps.event.addListener(map.getStreetView(), 'visible_changed', function() {
          if (map.getStreetView().getVisible()) {
            VisualMarker(false);
          } else {
            VisualMarker(true);
          }
        });
      }

      // インフォウィンドウにボタンを追加する関数
      function attachInfoWindow(marker, page) {
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div>
             <h3>${marker.getTitle()}</h3>
                <button style="width: 200px; height: 50px; margin-bottom: 5px;" onclick="window.open('${page[0]}', '_blank')">80mのビューを見る</button><br>
            </div>
          `
        });

        // マーカーをクリックしたときにインフォウィンドウを表示
        marker.addListener('click', function() {
          infoWindow.open(map, marker);
        });
      }

      // マーカーの表示/非表示を切り替える関数
      function VisualMarker(visible) {
        for (let i = 0; i < markers.length; i++) {
          markers[i].setVisible(visible);
        }
      }

function startMotionSensor() {
    window.addEventListener('deviceorientation', event => {
        console.log('Alpha:', event.alpha, 'Beta:', event.beta, 'Gamma:', event.gamma);
    });
}


      // ページが読み込まれたら地図を初期化
      window.onload = initMap;
