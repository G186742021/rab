let map;
let markers = [];

function initMap() {
    // 拓殖大学八王子キャンパス
    const center = { lat: 35.423305, lng: 138.859353 };

    // Google Mapを生成
    const map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 15
    });
    // マーカーの座標とマーカーの全天球画像
    const markerData = [
        { position: { lat: 35.428597, lng: 138.858912 }, page: [
                'sky1_20m.html',
                'sky1_30m.html',
                'sky1_50m.html',
                'sky1_80m.html',
                'sky1_120m.html'
            ]
        },
        { position: { lat: 35.425122, lng: 138.855432 }, page: 'sky2.html'} ];

        // マーカーを設置し、インフォウィンドウを作成
        for (let i = 0; i < markerData.length; i++) {
          const marker = new google.maps.Marker({
            position: markerData[i].position,
            map: map,
            title: 'Point ' + (i + 1)
          });

          // インフォウィンドウにボタンを追加
          attachInfoWindow(marker, markerData[i].page, markerData[i].description);

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
      function attachInfoWindow(marker, pageUrl, description) {
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div>
             <h3>${marker.getTitle()}</h3>
                <button onclick="window.open('${page[0]}', '_blank')">20mのビューを見る</button><br>
                <button onclick="window.open('${page[1]}', '_blank')">30mのビューを見る</button><br>
                <button onclick="window.open('${page[2]}', '_blank')">50mのビューを見る</button><br>
                <button onclick="window.open('${page[3]}', '_blank')">80mのビューを見る</button><br>
                <button onclick="window.open('${page[4]}', '_blank')">120mのビューを見る</button>
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

      // ページが読み込まれたら地図を初期化
      window.onload = initMap;
