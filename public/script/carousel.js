export default class Carousel {
    constructor({bannerRef}) {
        this.prevBtn = bannerRef.prevBtn;
        this.nextBtn = bannerRef.nextBtn;
        this.slideWrap = bannerRef.slideWrap;
        this.pagingList = bannerRef.pagingList;
        this.pagingIcons = bannerRef.pagingIcons;
        this.slideTime = bannerRef.slideTime;
        this.slideNum = bannerRef.slideNum;
        this.setEvent();
    }
    setEvent() {
        this.prevBtn.addEventListener('click',this.translateWrap.bind(this, 'prev', this.slideNum, this.slideTime));
        this.nextBtn.addEventListener('click',this.translateWrap.bind(this, 'next', this.slideNum, this.slideTime));
        this.pagingIcons.forEach(e => {
            e.addEventListener('mouseenter',this.switch.bind(this));
        })
    }
    translateWrap(direction, slideNum, slideTime) {
        this.slideWrap.style.transitionDuration = `${slideTime}ms`;
        if(direction === 'prev') this.slideWrap.style.transform = `translateX(${100/slideNum}%)`;
        else if(direction === 'next') this.slideWrap.style.transform = `translateX(${-1 * 100/slideNum}%)`;
        setTimeout(this.switchList.bind(this, direction), slideTime);
    }
    switchList(direction) {
        const wrap = this.slideWrap;
        wrap.removeAttribute('style');
        if(direction == 'next') wrap.appendChild(wrap.firstElementChild);
        else wrap.insertBefore(wrap.lastElementChild, wrap.firstChild);
        this.fillPaging();
    }
    switch({target}) {
        const wrap = this.slideWrap;
        const currPage = wrap.children[1].dataset.index;
        const targetPage = target.dataset.index;
        const diff = targetPage - currPage;
        if(diff > 0) {
            for(let i = 0; i < Math.abs(diff); i++) {
                wrap.appendChild(wrap.firstElementChild);
            }
        } else if(diff < 0) {
            for(let i = 0; i < Math.abs(diff); i++) {
                wrap.insertBefore(wrap.lastElementChild, wrap.firstChild);
            }
        }
        this.fillPaging();
    }
    fillPaging() {
        const currPage = this.slideWrap.children[1].dataset.index;
        this.pagingList.forEach(e => {
            e.classList.remove('curr_page');
        });
        this.pagingList[currPage].classList.add('curr_page');
    }
}
