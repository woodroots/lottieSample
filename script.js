var app = new Vue({
    el: '#app',
    data: {
        tel: '',
        kan: '',
        loadedValid: false,
        validObj: {},
        submitDone: 'init'
    },
    computed: {
        validTel() {
            var vm = this;
            if (vm.loadedValid) {

                var valid = vm.tel.match(/^\d{2,5}[-(]\d{1,4}[-)]\d{4}$/);
                var target = vm.validObj['tel'];
                if (valid) {
                    target.setDirection(1);
                    target.play();
                    return true;
                } else {
                    target.setDirection(-1);
                    target.play();
                    return false;
                }
            }
        },
        validKan() {
            var vm = this;
            if (vm.loadedValid) {
                var valid = vm.kan.match(/^[一-龥]+$/);
                var target = vm.validObj['kan'];
                if (valid) {
                    target.setDirection(1);
                    target.play();
                    return true;
                } else {
                    target.setDirection(-1);
                    target.play();
                    return false;
                }
            }

        },
    },
    methods: {
        validate() {
            var vm = this;
            var valid = document.querySelectorAll('.valid');
            var valids = [];
            valid.forEach(function (elem, i) {
                valids.push(
                    new Promise(function (resolve, reject) {
                        vm.validObj[elem.getAttribute('data-valid')] = bodymovin.loadAnimation({
                            container: elem,
                            path: 'https://assets4.lottiefiles.com/datafiles/uoZvuyyqr04CpMr/data.json',
                            renderer: 'svg',
                            loop: false,
                            autoplay: false
                        });
                        resolve();
                    })
                );
            });
            Promise.all(valids).then(function () {
                vm.loadedValid = true;
            });
        },
        like() {
            var vm = this;
            var likes = document.querySelectorAll('.like');
            likes.forEach(function (elem, i) {
                var like = bodymovin.loadAnimation({
                    container: elem,
                    path: 'https://assets6.lottiefiles.com/datafiles/IhSALigao8ZXm3t/data.json',
                    renderer: 'svg',
                    loop: false,
                    autoplay: false
                });
                elem.addEventListener('click', function () {
                    if (!elem.classList.contains('liked')) {
                        like.setDirection(1);
                        like.play();
                        elem.classList.add('liked');
                    } else {
                        like.setDirection(-1);
                        like.play();
                        elem.classList.remove('liked');
                    }
                }, false);
            });

        },
        search() {

            var search = bodymovin.loadAnimation({
                container: document.querySelector('.search'),
                path: 'https://assets7.lottiefiles.com/datafiles/k8dQgGd6PgypQ3N/data.json',
                renderer: 'svg',
                loop: false,
                autoplay: false
            });
            var form = document.getElementById('search');
            form.addEventListener('focus', function () {
                search.play();
            }, false);
            form.addEventListener('blur', function () {
                search.stop();
            }, false);

        },
        submitinit() {
            var submit = bodymovin.loadAnimation({
                container: document.querySelector('.submitLoading'),
                path: 'https://assets10.lottiefiles.com/datafiles/aba45c7b75d547282b2dbdc97969412b/progress_bar.json',
                renderer: 'svg',
                loop: true,
                autoplay: true
            });
            var submitFinish = bodymovin.loadAnimation({
                container: document.querySelector('.submitFinish'),
                path: 'https://assets6.lottiefiles.com/datafiles/xagAVK6Z2hhaURL/data.json',
                renderer: 'svg',
                loop: false,
                autoplay: false
            });

        },
        submit() {
            var vm = this;
            vm.submitDone = 'loading';
            setTimeout(function () {
                vm.submitDone = 'done';
            }, 5000);

        }
    },
    mounted() {
        var vm = this;
        vm.validate();
        vm.like();
        vm.search();
        vm.submitinit();
    }
});