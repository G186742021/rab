let map;
let markers = [];

function initMap() {
    // 拓殖大学八王子キャンパス
    const center = { lat: 35.62977993057464, lng: 139.28073285916975 };

    // Google Mapを生成
    const map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 18
    });
    // マーカーの座標とマーカーの全天球画像
    const markerData = [
        { position: { lat: 35.62977993057464, lng: 139.28073285916975 } page: 'sky2.html'} ];

   //  { position: { lat: 35.62996668120076, lng: 139.2799270710072 }, page: 'sky1.html' },
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
              <button onclick="window.open('${pageUrl}', '_blank')">360度ビューを見る</button>
              <br><br>
              <button onclick="alert('${description}')">場所の説明を見る</button>
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
