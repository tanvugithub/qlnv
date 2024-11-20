export const qlnvServices = {

    getListAPI: () => {
        return axios({
            method: 'GET',
            url: 'https://6728dabe6d5fa4901b6b3941.mockapi.io/api/v1/qlnv',
        })
    },

    addAPI: (payload) => {
        return axios({
            method: 'POST',
            url: 'https://6728dabe6d5fa4901b6b3941.mockapi.io/api/v1/qlnv',
            data: payload
        })
    },

    editAPI: (id, payload) => {
        return axios({
            method: 'PUT',
            url: `https://6728dabe6d5fa4901b6b3941.mockapi.io/api/v1/qlnv/${id}`,
            data: payload
        })
    },

    deleteAPI: (id) => {
        return axios({
            method: 'DELETE',
            url: `https://6728dabe6d5fa4901b6b3941.mockapi.io/api/v1/qlnv/${id}`
        })
    },

    getByIdAPI: (id) => {
        return axios({
            method: 'GET',
            url: `https://6728dabe6d5fa4901b6b3941.mockapi.io/api/v1/qlnv/${id}`
        })
    },
    tongLuong: (chucvu, luongCB) => {
        let tongLuong = 0;
        switch (chucvu) {
            case "1":
                tongLuong = +luongCB * 3;
                break;
            case "2":
                tongLuong = +luongCB * 2;
                break;
            case "3":
                tongLuong = +luongCB * 1;
                break;
            default:
                tongLuong = +luongCB * 1;
        }
        return tongLuong;
    },
    xepLoai: (giolam) => {
        let xepLoai = "";

        if (+giolam >= 192) {
            xepLoai = "Xuất sắc";
            return xepLoai;
        }

        if (+giolam >= 176) {
            xepLoai = "Giỏi";
            return xepLoai;
        }

        if (+giolam >= 160) {
            xepLoai = "Khá";
            return xepLoai;
        }

        if (+giolam < 160) {
            xepLoai = "Trung bình";
            return xepLoai;
        }
    },
    chucVu: (chucvu) => {
        let name = "";
        switch (chucvu) {
            case "1":
                name = "Sếp";
                break;
            case "2":
                name = "Trưởng phòng";
                break;
            case "3":
                name = "Nhân viên";
                break;
            default:
                name = "Nhân viên";
        }
        return name;
    }
}