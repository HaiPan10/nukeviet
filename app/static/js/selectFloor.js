const dateBook = document.getElementById("date-book")
dateBook.addEventListener("change", function () {
  let dateBookInfo = document.getElementById("date-book-info")
  dateBookInfo.value = dateBook.value
})

// const selectCaHoc = document.getElementById("select-ca-hoc")
// selectCaHoc.addEventListener("change", function(){
//  getCaHoc(parseInt(this.value))
// })

function getCaHoc(caHocId) {
  fetch(`/api/get_ca_hoc/${caHocId}`, {
    method: "post",
    body: JSON.stringify({
      "id": caHocId
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then(data => {
    let startTime = document.getElementById("start-time-book")
    let endTime = document.getElementById("end-time-book")
    startTime.value = data.gio_bat_dau
    endTime.value = data.gio_ket_thuc
  })
}

function saveBookRoom(userID, caHocID, form){
  console.log(chosen_room.id)
  fetch(`/api/save_book_room`,{
      method : "post",
      body : JSON.stringify({
          'tai_khoan_id' : userID,
          'ca_hoc_id' : caHocID,
          'ten_phong' : document.getElementById('chosen_room').value,
          'ngay_muon' : new Date(form['ngay_dat_phong'].value).toLocaleDateString(),
          'ly_do' : form['purpose'].value
      }),
      headers : {
          'Content-Type' : 'application/json'
      }
  }).then(res => res.json()).then(data => {
      if(data['status'] == "200"){
        window.location.href = "/"
      }
      else
      {
        prompt("Đặt phòng thất bại")
      }
  })
}