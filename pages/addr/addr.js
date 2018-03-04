
import { cityData } from '../../data/addrList' // 默认数据


Page({
  data: {
     // 地址三联动-数据
    addrData: {
      addrPicker: false,//省市区联动-蒙层：显示隐藏
      sheng: [],// 省数据表 
      shi: [],// 市数据表
      qu: [],//区
      provincename: '',// 最后选中的省 
      cityname: '',// 市
      areaname: '',// 区
      value: [0, 0, 0],// 索引值:显示被选中的
      cancel: 'showADDR',//取消事件
      confirm: 'confirmADDR',//确定按钮事件
      citychange: 'ChangeADDR',// 改变数据
    },
  },
  onLoad() {
    this.intADDR(this.data.addrData.value);
    this.intProvinces();
  },
  /** 地址三联动- 事件 */
  /* 选择地址 */
  //地址初始,省份单独列出，只执行一次
  intProvinces() {
    let provinces = [];
    // console.log(cityData);
    cityData.map(item => {
      provinces.push(item['label'])
    });

    this.setData({
      addrData: Object.assign(this.data.addrData, {
        sheng: provinces,
      }),
    });
  },
  // 市和区会按选中的省拿对应的数据，没有重新列成新数组；如果你改了地址的数据结构，在模板中也要有对应的修改
  intADDR() {
    const i = this.data.addrData.value;
    // console.log(cityData[i[0]]['children']);
    this.setData({
      addrData: Object.assign(this.data.addrData, {
        shi: cityData[i[0]]['children'],
        qu: cityData[i[0]]['children'][i[1]]['children'],
      }),
    });
  },
  // 显示或者隐藏蒙层，没有数据变化
  showADDR() {
    this.setData({
      addrData: Object.assign(this.data.addrData, {
        addrPicker: !this.data.addrData.addrPicker,
      }),

    });
  },
  // 确认提交，数据变化
  confirmADDR() {
    const i = this.data.addrData.value;
    let data = '';
    // console.log(cityData[i[0]]['children']);
    if (this.data.addrData.qu.length) {
      data = this.data.addrData.qu[i[2]]['label']
    }
    this.setData({
      addrData: Object.assign(this.data.addrData, {
        provincename: this.data.addrData.sheng[i[0]],// 省 
        cityname: this.data.addrData.shi[i[1]]['label'],// 市
        areaname: data,// 区
      }),
    });
    this.showADDR();//关闭蒙层
  },
  // 滚动选择数据
  ChangeADDR(e) {
    console.log(e.detail.value);
    let index = e.detail.value, indexOld = this.data.addrData.value, indexNew = [];
    if (index[0] != indexOld[0]) {
      indexNew = [index[0], 0, 0];// 如果改了省，那市和区的数据都取第一个
    } else if (index[1] != indexOld[1]) {
      indexNew = [index[0], index[1], 0];// 如果改了市，区的数据取第一个
    } else indexNew = index;
    //value：指定当前被选中的项
    this.setData({
      addrData: Object.assign(this.data.addrData, {
        value: indexNew,
      }),
    });
    this.intADDR();// 重新拿市区的数据
  },

});
