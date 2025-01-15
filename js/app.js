// produk
document.addEventListener('alpine:init', () => {
    Alpine.data('produk', () => ({
        items: [
            { id: 1, name: 'Alat Sensor Gerak', img: '1.png', price: 180000 },
            { id: 2, name: 'Bel Interkom', img: '2.png', price: 450000 },
            { id: 3, name: 'Body Scanner', img: '3.png', price: 25000000},
            { id: 4, name: 'Brankas Elektronik', img: '4.png', price: 2000000 },
            { id: 5, name: 'Detektor Asap', img: '5.png', price: 120000 },
            { id: 6, name: 'Dolphin Sound DS Orca MK2 Audio Interface', img: '6.png', price: 689000 },
            { id: 7, name: 'Equalizer DBX 215 SUB', img: '7.png', price: 470000 },
            { id: 8, name: 'GPS tracker ZACRO', img: '8.png', price: 140000 },
            { id: 9, name: 'Headset logitech G733', img: '9.png', price: 1755000 },
            { id: 10, name: 'Kabel Audio Canare L2T2S 100M', img: '10.png', price: 1700000 },
            { id: 11, name: 'CCTV Hikvision', img: '11.png', price: 2000000 },
            { id: 12, name: 'Kipas Angin Visalux Advance', img: '12.png', price: 128000 },
            { id: 13, name: 'Kris 1 Ltr Teko Listrik Plastik', img: '13.png', price: 172000 },
            { id: 14, name: 'Kris 1.2 Ltr Panci Elektrik Multifungsi', img: '14.png', price: 387000 },
            { id: 15, name: 'Microphone YLV 3.5mm', img: '15.png', price: 125000 },
            { id: 16, name: 'Mixer audio ASHLEY K-POP4', img: '16.png', price: 550000 },
            { id: 17, name: 'Pagar Listrik Otomatis', img: '17.png', price: 5500000 },
            { id: 18, name: 'Philips 5 Ltr Rice Cooker Hd4515/92', img: '18.png', price: 1100000 },
            { id: 19, name: 'Philips HR1559/10 - Stand Mixer 170 Watt', img: '19.png', price: 520000 },
            { id: 20, name: 'Philips HR3211/55 - Blender Core Chopper', img: '20.png', price: 420000 },
            { id: 21, name: 'Power amplifier FC-A2200', img: '21.png', price: 1350000 },
            { id: 22, name: 'Samsung RT53 Kulkas 2 Pintu', img: '22.png', price: 25500000 },
            { id: 23, name: 'Gas Detector SNDWAY', img: '23.png', price: 650000 },
            { id: 24, name: 'Setrika Maspion EX-1000', img: '24.png', price: 447000 },
            { id: 25, name: 'Smart Door Locks', img: '25.png', price: 5400000 },
            { id: 26, name: 'Smart Oven Vienta Oven Listrik Microwave', img: '26.png', price: 3300000 },
            { id: 27, name: 'Speaker logitech Z121', img: '27.png', price: 270000 },
            { id: 28, name: 'Subwoofer 8 inch 500 watt Embassy ES-844', img: '28.png', price: 200000 },
            { id: 29, name: 'Xiaomi Deerma DX700 Handheld Rotary Vacuum Cleaner', img: '29.png', price: 740000 },
            { id: 30, name: 'POLYTRON 43 Inch LED TV PLD 43S153', img: '30.png', price: 3750000 },
        ],
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            // cek ada barang sama
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // jika blm ada
            if (!cartItem) {
                this.items.push({ ...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;
            } else {
                // jika barang ada apakah sama atau beda
                this.item = this.items.map((item) => {
                    // jika barang ada
                    if (item.id !== newItem.id) {
                        return item;
                    }
                    else {
                        // jika barang sudah ada
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += newItem.price;
                        return item;
                    }
                });
            }
        },

        remove(id) {
            // ambil item yg mau dihapus
            const cartItem = this.items.find((item) => item.id === id);

            // jika item > 1
            if (cartItem.quantity > 1) {
                this.items = this.items.map((item) => {
                    if (item.id !== id) {
                        return item;
                    }
                    else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                });
            }
            else if (cartItem.quantity === 1) {
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        },
    });
});

// form checkout
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');
 
form.addEventListener('keyup', function () {
    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].value.length !== 0) {
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        } else {
            return false;
        }
    }
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
});

// kirim data
checkoutButton.addEventListener('click', async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    // const message = formatMessage(objData);
    // window.open('http://wa.me/6285777438126?text=' + encodeURIComponent(message));

    // transaksi token
    try {
        const response = await fetch('phpMidtrans/placeOrder.php', {
            method: 'POST',
            body: data,
        });
        const token = await response.text();
        // console.log(token);
        window.snap.pay(token);
    } catch (err) {
        console.log(err.message);
    }

});

// kirim wa
const formatMessage = (obj) => {
    return ` Data Customer
    Nama: ${obj.name}
    Email: ${obj.email}
    No HP: ${obj.phone}

Data Pesanan
    ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.
        total)}) \n`)}

        Total Belanja: ${rupiah(obj.total)}
        
        Terima Kasih Sudah Berbelanja di Piboo Elektronik.`;
};


// konversi rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};