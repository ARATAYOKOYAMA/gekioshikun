// This is a JavaScript file

function Set_Home(){
    //クラス名を指定してクラスを作成
    var Home = ncmb.DataStore("Home");
    //名前がストーブのインスタンスを取得
    Home.equalTo("name", "ストーブ")
        .fetch()
        .then(function(results){
            switch_check = results.switch_check;
                if(switch_check){
                    switch_state.setChecked(true);
                } else{
                    switch_state.setChecked(false);
                }
        })
        .catch(function(err){
            // エラー処理
            alert("取得エラーが発生しました");
        });    
};


/*
画面上のスイッチの変化をncmbに送る
*/
function Change_Home(){
    //クラス名を指定してクラスを作成
    var Home = ncmb.DataStore("Home");
    //名前がストーブのインスタンスを取得
    Home.equalTo("name", "ストーブ")
        .fetch()
        .then(function(results){
            results.set("switch_check", switch_check)
            .update();
        })
        .catch(function(err){
            // エラー処理
            alert("更新エラーが発生しました");
        });
};

/*
home.html内の要素をAnglerJSで管理出来るようにするためのコントローラー
*/
app.controller('HomeCtrl', function ($scope) {//HomeCtrlという名前のコントローラの作成
    /*
    ons-switchが変化したら呼ばれる
    */
    $scope.change_switch = function(){
        //ons-switchは仕様上初期値が必ずfalseである。万が一ストーブがonの状態でアプリを起動した場合、ons-switchがonに変化してしまい誤作動する。これを防ぐ
        if($scope.switch_check == true && switch_check == true){
            
        }else{
            //スイッチの状態を格納
            switch_check = $scope.switch_check;
            Change_Home();
            if(switch_check == true){
                alert("ストーブの電源をONにしました");
            }else if(switch_check == false){
                alert("ストーブの電源をOFFにしました");
            }else {};
        };
    };
});