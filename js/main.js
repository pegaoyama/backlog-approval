var API_KEY = 'kQwZHGM6XRmzXphZlOCZ5h2eAIhAeWCHDxR0uhdn9rkA2rADp6VrpKAuj9PIyvVb' // 更新用
var BASE_URL = 'https://pega-sys.backlog.com'
var PROJ_ID = '215642'	// プロジェクト：各種申請
var IS_ID_MTG = '1045530'	// 種別：MTG申請
var IS_ID_HOLIDAY = '1045645'	// 種別：休暇申請
var IS_ID_LATE = '1045529'	// 種別：遅刻申請
var IS_ID_EARLY = '1045528'	// 種別：早退申請
var IS_ID_HOLIDAYWORK = '1045713'	// 種別：休出申請
var IS_ID_REMOTE = '1045714'	// 種別：在宅申請
var IS_ID_WAIT = '1061609'	// 種別：自宅待機申請
var IS_ID_OTHER = '1045531'	// 種別：その他申請
var IS_ID_CHANGE = '1069593'	// 種別：定期代・住居変更申請
var STATUS_ID_REJECT = '59558'			// 状態：却下
var ASSIGN_ID = '408915'					// 担当者：長瀬紗耶

$(function () {
	/** jQueryが読まれた時 */
	$(document).ready(function () {
		// 課題一覧の取得
		get_tickets();
	});


	/** タブを変更 */
	$('input[name="issue-type"]:radio').on('change',function () {

		// タブの表示切り替え
		$('.btn-secondary').removeClass('active');
		$(this).parent().addClass('active');
		
		// 課題一覧の取得
		get_tickets();
	});

	
	/** チェックボックス変更 */
	$('input[name="status"]:checkbox').on('change',function () {

		// 課題一覧の取得
		get_tickets();
	});
	

	/** 届出課題一覧を取得 */
	function get_tickets() {
		// テーブルを空にする
		$('.list-tr').remove();

		// URL取得
		var url;
		var kbn = $('input[name="issue-type"]:checked').val();
		var check = $('input[name="status"]:checkbox').is(':checked');
		if (kbn == '1') {
			// 届出取得用URL
			if (check){
				url = BASE_URL + '/api/v2/issues'
				+ '?' + 'apiKey=' + API_KEY
				+ '&' + 'projectId[]=' + PROJ_ID						// プロジェクト指定
				+ '&' + 'issueTypeId[]=' + IS_ID_HOLIDAY			// 種別指定：休暇申請
				+ '&' + 'issueTypeId[]=' + IS_ID_LATE		// 種別指定：遅刻申請
				+ '&' + 'issueTypeId[]=' + IS_ID_EARLY		// 種別指定：早退申請
				+ '&' + 'issueTypeId[]=' + IS_ID_HOLIDAYWORK		// 種別指定：休出申請
				+ '&' + 'issueTypeId[]=' + IS_ID_REMOTE	// 種別指定：在宅申請
				+ '&' + 'issueTypeId[]=' + IS_ID_WAIT		// 種別指定：自宅待機申請
				+ '&' + 'issueTypeId[]=' + IS_ID_OTHER		// 種別指定：その他申請
				+ '&' + 'issueTypeId[]=' + IS_ID_CHANGE	// 種別指定：定期代・住居変更申請
				+ '&' + 'statusId[]=' + '4'					// 完了
				+ '&' + 'order=' + 'desc'					// 降順
				+ '&' + 'count=' + '100'					// 取得件数

				;
			}else{
				url = BASE_URL + '/api/v2/issues'
					+ '?' + 'apiKey=' + API_KEY
					+ '&' + 'projectId[]=' + PROJ_ID						// プロジェクト指定
					+ '&' + 'issueTypeId[]=' + IS_ID_HOLIDAY			// 種別指定：休暇申請
					+ '&' + 'issueTypeId[]=' + IS_ID_LATE		// 種別指定：遅刻申請
					+ '&' + 'issueTypeId[]=' + IS_ID_EARLY		// 種別指定：早退申請
					+ '&' + 'issueTypeId[]=' + IS_ID_HOLIDAYWORK		// 種別指定：休出申請
					+ '&' + 'issueTypeId[]=' + IS_ID_REMOTE	// 種別指定：在宅申請
					+ '&' + 'issueTypeId[]=' + IS_ID_WAIT		// 種別指定：自宅待機申請
					+ '&' + 'issueTypeId[]=' + IS_ID_OTHER		// 種別指定：その他申請
					+ '&' + 'issueTypeId[]=' + IS_ID_CHANGE	// 種別指定：定期代・住居変更申請
					+ '&' + 'assigneeId[]=' + ASSIGN_ID		// 担当者
					+ '&' + 'statusId[]=' + '1'					// 未対応
					+ '&' + 'statusId[]=' + '2'					// 処理中
					+ '&' + 'statusId[]=' + '3'					// 処理済み
					+ '&' + 'order=' + 'desc'					// 降順
					+ '&' + 'count=' + '100'					// 取得件数
					;
			}
				
		} else {
			// MTG申請取得用URL
			if (check){
				url = BASE_URL + '/api/v2/issues'
					+ '?' + 'apiKey=' + API_KEY
					+ '&' + 'projectId[]=' + PROJ_ID			// プロジェクト指定
					+ '&' + 'issueTypeId[]=' + IS_ID_MTG	// 種別指定：MTG申請
					+ '&' + 'statusId[]=' + '4'					// 完了
					+ '&' + 'order=' + 'desc'					// 降順
					+ '&' + 'count=' + '100'					// 取得件数
					;
			}else{
				url = BASE_URL + '/api/v2/issues'
					+ '?' + 'apiKey=' + API_KEY
					+ '&' + 'projectId[]=' + PROJ_ID			// プロジェクト指定
					+ '&' + 'issueTypeId[]=' + IS_ID_MTG	// 種別指定：MTG申請
					+ '&' + 'statusId[]=' + '1'					// 未対応
					+ '&' + 'statusId[]=' + '2'					// 処理中
					+ '&' + 'statusId[]=' + '3'					// 処理済み
					+ '&' + 'order=' + 'dec'					// 降順
					+ '&' + 'count=' + '100'					// 取得件数
					;
			}
		}

		fetch(url)
		.then(response => {
		  if (!response.ok) {
			// ステータスコードが成功（200）でない場合はエラーメッセージを表示
			throw new Error(`Error: ${response.status} - ${response.statusText}`);
		  }
		  // レスポンスをJSON形式に変換して返す
		  return response.json();
		})
		.then(data => {
		  // 課題一覧を表示
		  set_tables(data);
		})
		.catch(error => {
		  // エラー時の処理
		  console.error('Error fetching issue:', error);
		});
	};


	/** 画面：テーブルの追加 */
	function set_tables(data) {
		var check = $('input[name="status"]:checkbox').is(':checked');

		for (var i = 0; i < data.length; i++) {
			var issueKey = data[i]["issueKey"];				// 課題
			var keyId = data[i]["keyId"];					// 課題ID
			var startDate = data[i]["startDate"]			// 開始日
			if (startDate != null){
				var date = new Date(startDate);
				startDate = date.getFullYear() + '/' + parseInt(date.getMonth()+1) + '/' + date.getDate();
			}else{
				startDate = '未設定'
			}

			var dueDate = data[i]["dueDate"]				// 期限日
			if (dueDate != null){
				var date = new Date(dueDate);
				dueDate = date.getFullYear() + '/' + parseInt(date.getMonth()+1) + '/' + date.getDate();
			}else{
				dueDate = '未設定'
			}
			var created = data[i]["created"] 		// 起票日
			var dateObject = new Date(created);
			var year = dateObject.getFullYear();
			var month = dateObject.getMonth() + 1; // 月は0から始まるため+1する
			var day = dateObject.getDate();
			var formattedMonth = month < 10 ? `0${month}` : month;
			var formattedDay = day < 10 ? `0${day}` : day;
			created = `${year}/${formattedMonth}/${formattedDay}`;

			var category = ''
			var category_id = []
			if (data[i]["category"].length != 0){
				for (var j = 0;j<data[i]["category"].length;j++){
					// 完了以外はカテゴリは1件の想定
					if(j == data[i]["category"].length-1){
						// カテゴリ更新時に既存のカテゴリIDを渡す必要がある。)
						category_id.push(data[i]["category"][j]["id"])
						// ループ最終の場合、改行を足さない
						category += data[i]["category"][j]["name"]	// カテゴリ
					}else{
						category_id.push(data[i]["category"][j]["id"])

						category += data[i]["category"][j]["name"] + '<br>'	// カテゴリ
					}
				}
			}else{
				// カテゴリ未設定の場合は、カテゴリIDとして空白文字を設定しておく(承認時の兼ね合い)
				category_id.push('');
			}

			var summary = data[i]["summary"];				// 件名
			var description = data[i]["description"];		// 詳細
			var assignee = data[i]["assignee"]["name"];		// 担当者
			var status = data[i]["status"]["name"];			// 状態
			var create_user = data[i]["createdUser"]["id"];	// 課題申請者

			var issuetype = data[i]["issueType"]["id"]		// 課題種別
			
			var file_link = '';
			// 定期代・住居変更申請の場合、ファイルDLリンクを作成する
			if (issuetype == IS_ID_CHANGE){
				var file_id = data[i]["attachments"][0]["id"]		// 添付ファイルID
				var file_name = data[i]["attachments"][0]["name"]	// 添付ファイル名
				
				file_link =  '<br><a href="#" onclick="getFile(\''+issueKey+'\',\''+file_id+'\',\''+file_name+'\'); return false;">'+file_name+'</a>';
				// getFile(issueKey,file_id,file_name);
			}

			// 詳細の改行を変換
			description = description.replace(/\r?\n/g, '<br>');

			var tr = $('<tr class="list-tr"></tr>');
			var td_startDate = $('<td>' + startDate + '</td>')
			var td_dueDate = $('<td>' + dueDate + '</td>')
			var td_created = $('<td>' + created + '</td>')

			var td_category = $('<td>' + category + '</td>')
			var td_summary = $('<td>' + summary + '</td>')
			var td_description = $('<td><div id="td-description-' + keyId + '">' + description + file_link + '</div></td>')
			var td_assignee = $('<td>' + assignee + '</td>')
			var td_status = $('<td>' + status + '</td>')
			
			var td = $('<td></td>')
			var td_operation = $('<div class="td-operation"></div>')
			if (check){
				// 完了済の場合、差戻の操作ボタンを作成
				var btn_remand = $('<button type="button" class="m-1 btn btn-primary remand" data-category = "' + category_id[0] + '" value="' + issueKey + '">差戻</button>')
				td_operation.append(btn_remand)
			}else{
				// 完了済みでない場合、承認/却下の操作ボタンを作成
				var btn_approval = $('<button type="button" class="m-1 btn btn-primary approval" data-crtuser ="' + create_user + '" data-category = "' + category_id[0] + '" value="' + issueKey + '">承認</button>')
				var btn_rejected = $('<button type="button" class="m-1 btn btn-secondary rejected" data-crtuser ="' + create_user + '" value="' + issueKey + '">却下</button>')
				td_operation.append(btn_approval, btn_rejected)
			}
			td.append(td_operation)
			tr.append(td_summary, td_category, td_startDate, td_dueDate, td_created, td_description, td_assignee, td_status, td)
		

			$('tbody').append(tr);
			// 詳細のURLをリンク付きに変換
			var exp = /((?<!href="|href='|src="|src=')(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
			$('#td-description-' + keyId).html($('#td-description-' + keyId).html().replace(exp, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'))
		}
	};


	/** 課題の更新(承認) */
	function update_ticket_approval(issuekey ,ctruser, selectpoint='0', category='') {
		var kbn = $('input[name="issue-type"]:checked').val();

		// url生成
		var url = create_url(issuekey);

		// MTG申請の場合、完了にして課題作成者に担当変更する
		var payload = {"statusId": '4',"assigneeId": ctruser} 

		if (selectpoint != '0'){
			// マイナス設定なし以外かつカテゴリ設定済みの場合、設定されているカテゴリ＋マイナスポイントを設定する
			if(category != ''){
				payload["categoryId[]"] = [category,selectpoint]
			}
			// マイナス設定なし以外かつカテゴリ未設定の場合、マイナスポイントのみ設定する
			else{
				payload["categoryId[]"] = selectpoint
			}
		}

		return ajax(url,payload)
	};


	/** 課題の更新(却下) */
	function update_ticket_rejected(issuekey, ctruser, comment) {
		// url生成
		var url = create_url(issuekey);

		// 却下時のパラメータ
		var payload = {
			"statusId": STATUS_ID_REJECT, // 状態：却下
			"assigneeId": ctruser,			// 担当者：申請者
			"comment": comment				// コメント
		}

		return ajax(url,payload);
	};


	/** 課題の更新(差戻) */
	function update_ticket_remand(issuekey,category) {
		var kbn = $('input[name="issue-type"]:checked').val();
		// url生成
		var url = create_url(issuekey);

		// 差戻時のパラメータ
		var payload = {
			"statusId": '1',			// 状態：未対応
		}
		if (kbn == '1'){
			payload["categoryId[]"] = category
		}

		return ajax(url,payload);
	};


	/** 承認ボタン押下 */
	$(document).on("click", ".approval", function () {
		var issuekey = $(this).val();
		var kbn = $('input[name="issue-type"]:checked').val();
		var category = String($(this).data('category'));
		var ctruser = String($(this).data('crtuser'));

		// ポイントのマイナスはどうするかの確認ダイアログ
		if  (kbn == '1'){

			$('#point-dialog').dialog({
				modal: true,
				title:'ポイント選択',
				width:'250',
				height:'200',
				fruid:true,
				create:function(event,ui){
				},
				buttons: [{
					text:'OK',
					class: 'ok-button',
					click:function(){
						var selectpoint = $('#select-point').val()

						// 更新
						update_ticket_approval(issuekey,ctruser,selectpoint,category);

						$('#select-point').val(['0']);
	
						$(this).dialog('close');
					},
				},{
					text:'キャンセル',
					class: 'cancel-button',
					click:function(){
						$(this).dialog('close');
					}
				}],
				close: function(){
					$('.cancel-button').off('click');
				}
			});

		}else{
			// MTG申請時はポイントの増減なし
			// 更新処理
			update_ticket_approval(issuekey,ctruser);
		}

	});


	/** 却下ボタン押下 */
	$(document).on("click", ".rejected", function () {
		var issuekey = $(this).val();
		var ctruser = String($(this).data('crtuser'));
		
		// コメント追加のダイアログ
		$('#cancel-dialog').dialog({
			modal: true,
			title:'却下理由入力',
			width:'500',
			height:'300',
			fruid:true,
			create:function(event,ui){
			},
			buttons: [{
				text:'OK',
				class: 'ok-button',
				click:function(){
					var comment = $('#cancel-textarea').val();
					// コメントの改行を変換する
					var replace_comment = comment.replace(/\n/g, '&br;');
					
					// 更新
					update_ticket_rejected(issuekey,ctruser,replace_comment);

					// 他却下処理時にコメントが残ったままになるので削除する
					$('#cancel-textarea').val('');
					$(this).dialog('close');
				},
			},{
				text:'キャンセル',
				class: 'cancel-button',
				click:function(){
					$('#cancel-textarea').val('');
					$(this).dialog('close');
				}
			}],
			close: function(){

				$('.cancel-button').off('click');
			}
		});

	});


	/** 差戻ボタン押下 */
	$(document).on("click", ".remand", function () {
		var issuekey = $(this).val();
		var category = String($(this).data('category'));


		// 差戻処理
		update_ticket_remand(issuekey,category);
	});

	
	function create_url(issuekey) {
		// url生成
		var url = BASE_URL + '/api/v2/issues'
		+ '/' + issuekey
		+ '?' + 'apiKey=' + API_KEY
		;
		return url;
	};


	function ajax(url,payload) {
		// 課題更新処理
		$.ajax({
			type: 'PATCH',
			url: url,
			data: payload
		}).done(function (result) {
			// 成功処理
			// 課題一覧の再取得
			get_tickets();
			return result;
		}).fail(function (result) {
			// 失敗処理
			console.log('失敗', result);
			return result;
		});
	};
});

/**課題添付ファイルの取得 */
function getFile(issueKey,file_id,file_name){
	var url = BASE_URL + '/api/v2/issues' +
		'/' + issueKey +
		'/attachments' +
		'/' + file_id + 
		'?' + 'apiKey=' + API_KEY;

	fetch(url)
	.then(response => {
	  if (!response.ok) {
		// ステータスコードが成功（200）でない場合はエラーメッセージを表示
		throw new Error(`Error: ${response.status} - ${response.statusText}`);
	  }
	  // ファイルデータをBlob形式で取得
	  return response.blob();
	})
	.then(blob  => {
	  // Blobからダウンロード用のURLを作成
	  const downloadUrl = window.URL.createObjectURL(blob);
	  const a = document.createElement('a');
	  a.href = downloadUrl;
  
	  a.download = file_name;  // ファイル名を指定
	  document.body.appendChild(a);
	  a.click();
	  
	  // ダウンロードリンクを削除
	  a.remove();
	  
	  // オブジェクトURLを解放
	  window.URL.revokeObjectURL(downloadUrl);
	})
	.catch(error => {
	  // エラー時の処理
	  console.error('Error fetching issue:', error);
	});
};