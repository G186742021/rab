let map;
let markers = [];

function initMap() {
    // 拓殖大学八王子キャンパス
    const center = { lat: 35.62729715112113, lng: 139.28057611273974 };

    // Google Mapを生成
    const map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 18
    });

    // マーカーの座標とマーカーの全天球画像
    const markerData = [
        { position: { lat: 35.62996668120076, lng: 139.2799270710072 }, page: 'sky/sky1.html' },
        { position: { lat: 35.62977993057464, lng: 139.28073285916975 }, page: 'sky/sky2.html' },
        { position: { lat: 35.629082899737014, lng: 139.28052898505635 }, page: 'sky/sky3.html' },
        { position: { lat: 35.628154392599505, lng: 139.28016654219047 }, page: 'sky/sky4.html' },
        { position: { lat: 35.62738632756379, lng: 139.27987852955098 }, page: 'sky/sky5.html' },
        { position: { lat: 35.62698124918482, lng: 139.27976526615663 }, page: 'sky/sky6.html' },
        { position: { lat: 35.627470499420845, lng: 139.27943842035575 }, page: 'sky/sky7.html' },
        { position: { lat: 35.6275862355979, lng: 139.27905008871113 }, page: 'sky/sky8.html' },
        { position: { lat: 35.62857524702214, lng: 139.2794028232984 }, page: 'sky/sky9.html' },
        { position: { lat: 35.62917496076154, lng: 139.2796164057157 }, page: 'sky/sky10.html' },
        { position: { lat: 35.62698142656696, lng: 139.27881723383808 }, page: 'sky/sky11.html' },
        { position: { lat: 35.62623176312509, lng: 139.27852922116347 }, page: 'sky/sky12.html' },
        { position: { lat: 35.625550483940714, lng: 139.2783059304547 }, page: 'sky/sky13.html' },
        { position: { lat: 35.625787222535884, lng: 139.27740629543123 }, page: 'sky/sky14.html' },
        { position: { lat: 35.62702614309579, lng: 139.27795319584024 }, page: 'sky/sky15.html' },
        { position: { lat: 35.62589243946781, lng: 139.27897903865062 }, page: 'sky/sky16.html' },
        { position: { lat: 35.6267420611002, lng: 139.279176440588 }, page: 'sky/sky17.html' },
        { position: { lat: 35.62609498165998, lng: 139.28005989517257 }, page: 'sky/sky18.html' },
        { position: { lat: 35.625195374721535, lng: 139.27974599372604 }, page: 'sky/sky19.html' },
    ];

    // マーカーを設置
    for (let i = 0; i < markerData.length; i++) {
        const marker = new google.maps.Marker({
            position: markerData[i].position,
            map: map,
            title: 'Point ' + (i + 1)
        });

        // マーカーのクリック処理
        marker.addListener('click', function() {
            window.location.href = markerData[i].page;
        });

         markers.push(marker);
    }
        // ストリートビューが表示のON/OFFでマーカーの表示を切り替える
        google.maps.event.addListener(map.getStreetView(), 'visible_changed', function() {
            if (map.getStreetView().getVisible()) {
                VisualMarker(false);
            } else {
                 VisualMarker(true);}
        });
    }
    
    // マーカーの表示/非表示を切り替える関数
    function VisualMarker(visible) {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setVisible(visible);
        }
}
