export class NhanVien {
    constructor(username, name, email, password, ngaylam, luongCB, chucvu, giolam) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
        this.ngaylam = ngaylam;
        this.luongCB = luongCB;
        this.chucvu = chucvu;
        this.giolam = giolam;
    }

    tinhGiaKhuyenMai() {
        return Number(this.giaMon) * (1 - Number(this.khuyenMai) / 100)
    }

    tongLuong() {
        let tongLuong = 0;
        switch (this.chucvu) {
            case "1":
                tongLuong = +this.luongCB * 3;
                break;
            case "2":
                tongLuong = +this.luongCB * 2;
                break;
            case "3":
                tongLuong = +this.luongCB * 1;
                break;
            default:
                tongLuong = +this.luongCB * 1;
        }
        return tongLuong;
    }

    //Xếp loại
    // + nếu nhân viên có giờ làm trên 192h (>=192): nhân viên xuất sắc
    // + nếu nhân viên có giờ làm trên 176h (>=176): nhân viên giỏi
    // + nếu nhân viên có giờ làm trên 160h (>=160): nhân viên khá
    // + nếu nhân viên có giờ làm dưới 160h: nhân viên trung bình

    xepLoai() {
        let xepLoai = "";

        if (+this.giolam >= 192) {
            xepLoai = "Xuất sắc";
            return xepLoai;
        }

        if (+this.giolam >= 176) {
            xepLoai = "Giỏi";
            return xepLoai;
        }

        if (+this.giolam >= 160) {
            xepLoai = "Khá";
            return xepLoai;
        }

        if (+this.giolam < 160) {
            xepLoai = "Trung bình";
            return xepLoai;
        }
    }
}