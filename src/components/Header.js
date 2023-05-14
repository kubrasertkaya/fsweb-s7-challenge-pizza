import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import "./Header.css";
export default function Header() {

  const [size, setSize] = useState('medium');
  const [price, setPrice] = useState(85.6);
  const [buttonDisabledMi, setButtonDisabledMi] = useState(false);
  const [formData, setFormData] = useState({
    isim: 'fsweb0323',
    boy: '',
    hamur: '',
    sos: '',
    malzemeler: [],
    not: '',
  });
  const [formError, setFormError] = useState({
    isim: '',
    boy: '',
    hamur: '',
    sos: '',
    malzemeler: '',
    not: '',
  });


  useEffect(() => {
    sema.isValid(formData).then((valid) => setButtonDisabledMi(valid))
  }, [formData]);

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };





  const [orderCount, setOrderCount] = useState(1);


  const handleCountDecrease = () => {
    setOrderCount(orderCount - 1);
  };

  const handleCountIncrease = () => {
    setOrderCount(orderCount + 1);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
  };
  const sema = Yup.object({
    isim: Yup.string().max(12, "İsim en çok 12 karakter olmalıdır").required("Bu alan gereklidir"),
    boy: Yup.string().required('Lütfen pizza boyunu seçiniz.'),
    hamur: Yup.string().notOneOf(["-1",""], 'Lütfen hamur tipini seçiniz.'),
    sos: Yup.string().required('Lütfen sos seçiniz.'),
    malzemeler: Yup.array()
      .max(10, 'En fazla 10 malzeme seçebilirsiniz.'),
  });



  function hatalariKontrolEt(name, value) {
    Yup.reach(sema, name)
      .validate(value)
      .then(() => {
        setFormError({
          ...formError,
          [name]: ""
        });
      })
      .catch((error) => {
        setFormError({
          ...formError,
          [name]: error.errors[0]
        });
      });
  }
  function handleTextChange(e) {
    const { name, value } = e.target;

    hatalariKontrolEt(name, value);

    setFormData({
      ...formData,
      [name]: value
    });
  }
  function handleChange(e) {
    const { value, name } = e.target;
    let newToppings = null;

    if (formData.malzemeler.includes(value)) {
      newToppings = formData.malzemeler.filter((d) => d !== value);
    } else {
      newToppings = [...formData.malzemeler, value];
    }
    console.log(newToppings);
    hatalariKontrolEt(name, newToppings);
    setFormData({
      ...formData,
      malzemeler: newToppings
    });
    if (e.target.checked === true) {
      setPrice(price + 5);
    }
    else {
      setPrice(price - 5);
    }

  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(setFormData);
  }
  useEffect(() => {
    setButtonDisabledMi(formError.isim !== "" || formError.malzemeler !== "");
  }, [formError]);
  
function handleSelectChange (e){
  const {name,value}=e.target
  hatalariKontrolEt(name, value);

    setFormData({
      ...formData,
      [name]: value
    });
}
  return (
    <div>
      <div className="header-wrapper">
        <div className='child'>
          <h1>Teknolojik Yemekler</h1>

          <div className="w-[50vw] mb-5">
            <nav className="text-white  ">
              <Link to="/">Anasayfa</Link>
              <span> - </span>
              <Link>Seçenekler</Link>
              <span> - </span>
              <Link className="text-white ">Sipariş Oluştur</Link>
            </nav>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='child'>
          <h2>Position Absolute Acı Pizza</h2>
          <div className='pricing'>
            <strong><p className='pricing-padding'>85.50 ₺</p></strong>
            <p className='pricing-padding'>4.9</p>
            <p className='pricing-padding'>(200)</p>
          </div>
          <p>Front Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre.
            Pizza ,domates,peynir ve genellikle çeşitli malzemelerle kaplanmış,daha sonra geleneksel
            odun ateşinde yüksek sıcaklıkta pişirilen ,düzleştirilen mayalı buğday bazlı hamurdan
            oluşan İtalyan kökenli lezzetli bir yemektir.Bunu sipariş etmek şimdi çok kolay.Tek bir
            tuşla hemen kapında.Denemediysen çok şey kaçırıyorsun.
          </p>

        </div>
        <form className='child'>
          <div className='size'>
          <strong><h2>Boyut Seç</h2></strong>
          <label>
            Small
            <input
              type="checkbox"
              value="small"
              checked={size === 'small'}
              onChange={handleSizeChange}
            >
            </input>
          </label>
          <br />
          <label>
            Medium
            <input
              type="checkbox"
              value="medium"
              checked={size === 'medium'}
              onChange={handleSizeChange}
            >
            </input>

          </label>
          <br />
          <label>
            Large
            <input
              type="checkbox"
              value="large"
              checked={size === 'large'}
              onChange={handleSizeChange}
            >
            </input>
          </label>
          <br />
          </div>
          <strong><h2>Hamur Seç</h2></strong>
          <select name="hamur" id="pizzaHamurlari" onChange={handleSelectChange}>
            <option value="-1">Hamur Kalınlığı</option>
            <option value="ince">İnce</option>
            <option value="orta">Orta</option>
            <option value="kalin">Kalın</option>
          </select>
          {formError.hamur !== "" && (
              <div className="field-error">{formError.hamur}</div>
            )}
          <div className='child'>
            <h2>Ek Malzemeler</h2>
            <p>En fazla 10 malzeme seçebilirsiniz.5₺</p>

            <div className='toppings'>
            <label>
              <input
                value="Papperroni"
                type="checkbox"
                name="malzemeler"
                onChange={handleChange}
                checked={formData.malzemeler.includes("Papperroni")}
              />
              Papperroni
            </label>
            <label>
              <input
                value="Sosis"
                type="checkbox"
                name="malzemeler"
                onChange={handleChange}
                checked={formData.malzemeler.includes("Sosis")}
              />
              Sosis
            </label>
            <label>
              <input
                value="Domates"
                type="checkbox"
                name="malzemeler"
                onChange={handleChange}
                checked={formData.malzemeler.includes("Domates")}
              />
              Domates
            </label>
            <label>
              <input
                value="Biber"
                type="checkbox"
                name="malzemeler"
                onChange={handleChange}
                checked={formData.malzemeler.includes("Biber")}
              />
              Biber
            </label>
            <label>
              <input
                value="Mısır"
                type="checkbox"
                name="malzemeler"
                onChange={handleChange}
                checked={formData.malzemeler.includes("Mısır")}
              />
              Mısır
            </label>
            <label>
              <input
                value="Sucuk"
                type="checkbox"
                name="malzemeler"
                onChange={handleChange}
                checked={formData.malzemeler.includes("Sucuk")}
              />
              Sucuk
            </label>
            <label>
              <input
                value="Jambon"
                type="checkbox"
                name="malzemeler"
                onChange={handleChange}
                checked={formData.malzemeler.includes("Jambon")}
              />
              Jambon
            </label>
            <label>
              <input
                value="Salam"
                type="checkbox"
                name="malzemeler"
                onChange={handleChange}
                checked={formData.malzemeler.includes("Salam")}
              />
              Salam
            </label>
            <label>
              <input
                value="Ananas"
                type="checkbox"
                name="malzemeler"
                onChange={handleChange}
                checked={formData.malzemeler.includes("Ananas")}
              />
              Ananas
            </label>
            <label>
              <input
                value="Jalepeno"
                type="checkbox"
                name="malzemeler"
                onChange={handleChange}
                checked={formData.malzemeler.includes("Jalepeno")}
              />
              Jalepeno
            </label>
            <label>
              <input
                value="Tavuk"
                type="checkbox"
                name="malzemeler"
                onChange={handleChange}
                checked={formData.malzemeler.includes("Tavuk")}
              />
              Tavuk
            </label>
            <label>
              <input
                value="Kabak"
                type="checkbox"
                name="malzemeler"
                onChange={handleChange}
                checked={formData.malzemeler.includes("Kabak")}
              />
              Kabak
            </label>
            </div>
            {formError.malzemeler !== "" && (
              <div className="field-error">{formError.malzemeler}</div>
            )}
          </div>
          <div className="child">
            <h2>Sipariş Notu</h2>

            <textarea name="not" placeholder="Siparişine eklemek istediğin bir not var mı?"></textarea>


          </div>
        </form>

        <div className='child'>
          <form onSubmit={handleSubmit}>
            {console.log('Form Rendered!')}
            <div>
              <label htmlFor="isim">Adınız</label>
              <input
                name="isim"
                id="isim"
                onChange={handleTextChange}
                type="text"
                value={formData.isim} />
              {formError.isim && <span className="error">{formError.isim}</span>}

            </div>
            <div>
              <label>Sipariş Sayısı:</label>
              <div>
                <button onClick={handleCountDecrease}>-</button>
                <input type="number" name="orderCount" min="1" max="10" value={orderCount} />
                <button onClick={handleCountIncrease}>+</button>
              </div>
            </div>
            <div>
              <input value={price}>
              </input>

              <Link to='/success'><button type='submit' disabled={buttonDisabledMi}>Sipariş Oluştur</button></Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
