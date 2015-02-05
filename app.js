document.addEventListener('polymer-ready',function(){
    var navicon = document.getElementById('navicon');
    var drawerPanel = document.getElementById('drawerPanel');
    navicon.addEventListener('click',function(){
        drawerPanel.togglePanel();
    })
    
    var crs = new L.Proj.CRS.TMS(
         'EPSG:28992',
         '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs',
         [-285401.92,22598.08,595401.92,903401.92], {
         resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.21]
    })
  
    var map = L.map('map',{crs:crs, minZoom: 0, maxZoom: 12, fadeAnimation: true});
    var topo =new L.Proj.TileLayer.TMS('http://services.geodan.nl/tms/1.0.0/topokaart_EPSG28992/{z}/{x}/{y}.png',crs,{
        maxZoom: 14
        ,minZoom: 0,
        attribution: 'Kaart: &copy; <a href="http://maps.geodan.nl">Geodan</a>'
    })
        map.addLayer(topo);  
    var lufo =new L.Proj.TileLayer.TMS('http://geodata1.nationaalgeoregister.nl/luchtfoto/tms/1.0.0/luchtfoto/EPSG28992/{z}/{x}/{y}.jpeg',crs,{
        maxZoom: 14
        ,minZoom: 0
        , attribution: 'Foto: &copy; <a href="http://pdok.nl">Kadaster</a>'
    });

    map.setView([52.3,4.9],6)
    var hash = L.hash(map);

    

    var lufobutton = document.getElementById('lufo');
    lufobutton.addEventListener('click',function(){
        map.addLayer(lufo).removeLayer(topo);
        this.setAttribute('raised',true);
         document.getElementById('topo').removeAttribute('raised');
    })
    var topobutton = document.getElementById('topo');
    topobutton.addEventListener('click',function(){
        map.addLayer(topo).removeLayer(lufo);
        this.setAttribute('raised',true);
        document.getElementById('lufo').removeAttribute('raised');
    })
    document.getElementById('idicon').addEventListener('click',function(){
       document.getElementById('login').toggle();
    })
     document.getElementById('addlayer').addEventListener('click',function(){
       document.getElementById('layerlist').toggle();
    })
    
});