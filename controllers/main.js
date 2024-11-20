import { NhanVien } from "../models/NhanVien.js";
import { qlnvServices } from "../services/qlnv.services.js";
import { Validation } from "../services/Validation.js";

const btnInsert = document.getElementById("btnInsert");
const btnInsertSubmit = document.getElementById("btnInsertSubmit");
const btnUpdateSubmit = document.getElementById("btnUpdateSubmit");
const headerTileModal = document.getElementById("header-title");

const validation = new Validation();
const arrNV = [];

const renderTable = (data) => {
    let htmlContent = '';

    data.forEach((item, index) => {

        htmlContent += `
            <tr>
                <td>${item.username}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${moment(item.ngaylam).format(
            "DD-MM-YYYY")}</td>
                <td>${qlnvServices.chucVu(item.chucvu)}</td>
                <td>
                    ${new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(qlnvServices.tongLuong(item.chucvu, item.luongCB))}
                </td>
                <td>${qlnvServices.xepLoai(item.giolam)}</td>
                <td>
                    <button class="btn btn-warning w-100" data-toggle="modal" 
                    data-target="#myModal"
                    onClick="editNV('${item.id}')"
                    >Edit</button>
                    <button class="btn btn-danger mt-2 w-100" onClick="deleteNV('${item.id}')">Delete</button>
                </td>
            </tr>
        `;
    });
    document.getElementById("tableList").innerHTML = htmlContent;
}

// Lấy danh sách nhân viên
const getList = async () => {
    try {
        const res = await qlnvServices.getListAPI();
        if (res && res.data) {

            res.data.forEach((item) => {
                item.tongluong = qlnvServices.tongLuong(item.chucvu, item.luongCB);
                item.xeploai = qlnvServices.xepLoai(item.giolam);
                arrNV.push(item);
            })
            console.log(">>> arrNV: ", arrNV);

            renderTable(arrNV);
        }
    } catch (err) {
        console.log('err: ', err);
    }
}
getList();

// Lấy thông tin từ Form
const getFormInfo = () => {
    const elements = document.querySelectorAll("#formNV input, #formNV select");
    //console.log(">>> elements: ", elements);

    let nv = {};
    elements.forEach((element) => {
        const { id, value } = element;
        nv[id] = value;
    })

    //Khởi tạo object nhân viên
    return new NhanVien(nv.username, nv.name, nv.email, nv.password, nv.ngaylam, nv.luongCB, nv.chucvu, nv.giolam);
}

//Bắt sự kiện click button Thêm -> mở modal
btnInsert.onclick = async () => {
    headerTileModal.innerHTML = "Thêm mới nhân viên";
    btnUpdateSubmit.setAttribute("style", "display:none");
    btnInsertSubmit.removeAttribute("style", "display:none");

    const elements = document.querySelectorAll("#formNV input, #formNV select");
    elements.forEach((element) => {
        element.value = "";
    })
}

// Thêm mới: submit Insert
btnInsertSubmit.onclick = async () => {
    const data = getFormInfo();

    let isValid = true;
    isValid &= validation.required(data.username, "Vui lòng nhập tài khoản", 'tbUsername')
        && validation.minLength(data.username, 4, "Tài khoản phải từ 4 kí tự", "tbUsername")
        && validation.maxLength(data.username, 6, "Tài khoản tối đa 6 kí tự", "tbUsername")
        && validation.required(data.name, "Vui lòng nhập họ tên", 'tbName')
        && validation.isText(data.name, "Họ tên phải là chữ", "tbName")
        && validation.required(data.email, "Vui lòng nhập email", 'tbEmail')
        && validation.isEmail(data.email, "Email không đúng định dạng", 'tbEmail')
        && validation.required(data.password, "Vui lòng nhập mật khẩu", 'tbPassword')
        && validation.minLength(data.password, 6, "Mật khẩu phải từ 4 kí tự", "tbPassword")
        && validation.maxLength(data.password, 10, "Mật khẩu tối đa 6 kí tự", "tbPassword")
        && validation.isPassword(data.password, "Mật khẩu chưa đúng định dạng", "tbPassword")
        && validation.required(data.ngaylam, "Vui lòng nhập ngày làm", 'tbNgayLam')
        && validation.isDate(data.ngaylam, "Ngày làm không đúng định dạng", 'tbNgayLam')
        && validation.required(data.luongCB, "Vui lòng nhập lương cơ bản", 'tbLuongCB')
        && validation.isLuongCB(data.luongCB, "Lương cơ bản nằm trong khoảng [10.000.000 - 20.000.000]", 'tbLuongCB')
        && validation.isChucVu(data.chucvu, "Vui lòng chọn chức vụ", 'tbChucVu')
        && validation.required(data.giolam, "Vui lòng nhập giờ làm", 'tbGiolam')
        && validation.isGioLam(data.giolam, "Giờ làm nằm trong khoảng [80-200] giờ", 'tbGiolam')

    if (!isValid) return;

    await qlnvServices.addAPI(data);
    getList();
}

// Cập nhật: submit update
btnUpdateSubmit.onclick = async () => {
    const data = getFormInfo();

    let isValid = true;
    isValid &= validation.required(data.username, "Vui lòng nhập tài khoản", 'tbUsername')
        && validation.minLength(data.username, 4, "Tài khoản phải từ 4 kí tự", "tbUsername")
        && validation.maxLength(data.username, 6, "Tài khoản tối đa 6 kí tự", "tbUsername")
        && validation.required(data.name, "Vui lòng nhập họ tên", 'tbName')
        && validation.isText(data.name, "Họ tên phải là chữ", "tbName")
        && validation.required(data.email, "Vui lòng nhập email", 'tbEmail')
        && validation.isEmail(data.email, "Email không đúng định dạng", 'tbEmail')
        && validation.required(data.password, "Vui lòng nhập mật khẩu", 'tbPassword')
        && validation.minLength(data.password, 6, "Mật khẩu phải từ 4 kí tự", "tbPassword")
        && validation.maxLength(data.password, 10, "Mật khẩu tối đa 6 kí tự", "tbPassword")
        && validation.isPassword(data.password, "Mật khẩu chưa đúng định dạng", "tbPassword")
        && validation.required(data.ngaylam, "Vui lòng nhập ngày làm", 'tbNgayLam')
        && validation.isDate(data.ngaylam, "Ngày làm không đúng định dạng", 'tbNgayLam')
        && validation.required(data.luongCB, "Vui lòng nhập lương cơ bản", 'tbLuongCB')
        && validation.isLuongCB(data.luongCB, "Lương cơ bản nằm trong khoảng [10.000.000 - 20.000.000]", 'tbLuongCB')
        && validation.isChucVu(data.chucvu, "Vui lòng chọn chức vụ", 'tbChucVu')
        && validation.required(data.giolam, "Vui lòng nhập giờ làm", 'tbGiolam')
        && validation.isGioLam(data.giolam, "Giờ làm nằm trong khoảng [80-200] giờ", 'tbGiolam')

    if (!isValid) return;

    const id = document.getElementById('formNV').getAttribute('data-id');

    await qlnvServices.editAPI(id, data);
    getList();
}

// edit click on table
window.editNV = async (id) => {
    headerTileModal.innerHTML = "Cập nhật nhân viên";
    btnUpdateSubmit.removeAttribute("style", "display:none");
    btnInsertSubmit.setAttribute("style", "display:none");

    document.getElementById('formNV').setAttribute('data-id', id)

    try {
        const res = await qlnvServices.getByIdAPI(id);
        //hiển thị data lên form
        const elements = document.querySelectorAll("#formNV input, #formNV select");
        elements.forEach((element) => {
            const { id } = element;
            element.value = res.data[id];
        })

    } catch (err) {
        console.log("Err: ", err);

    }
}

window.deleteNV = async (id) => {
    try {
        await qlnvServices.deleteAPI(id);
        getList();
    } catch (err) {
        console.log("Err");
    }
}

document.getElementById("btnSearch").onclick = () => {
    const searchValue = document.getElementById("searchInput").value;
    //console.log(searchValue.toLowerCase());

    if (searchValue !== "") {
        if (arrNV.length > 0) {
            const resultArr = arrNV.filter((item) => {
                return item.xeploai.toLowerCase() == searchValue.toLowerCase() || nonAccentVietnamese(item.xeploai.toLowerCase()) == nonAccentVietnamese(searchValue.toLowerCase());
            })
            renderTable(resultArr);
        }
    } else {
        renderTable(arrNV);
    }

}

// Hàm chuyển không dấu
const nonAccentVietnamese = (str) => {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
};