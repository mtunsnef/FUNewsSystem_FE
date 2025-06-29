function showToast(message, icon = 'success', timer = 3000) {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: icon, // success | error | warning | info | question
        title: message,
        showConfirmButton: false,
        timer: timer,
        timerProgressBar: true,
    });
}

function hideToast() {
    Swal.close(); // Ẩn bất kỳ toast hoặc modal Swal nào đang hiển thị
}
