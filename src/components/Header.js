import React, { useState } from 'react';
import * as Yup from 'yup';


import { Link } from "react-router-dom";
import "./Header.css";
export default function Header () {
  const [size, setSize] = useState('medium');
  const [price, setPrice] = useState(85.6);

    const handleSizeChange = (event) => {
        setSize(event.target.value);
      };
      const [toppings,setTopings]=useState([
        { id: "1", name: "Papperroni", status: true },
        { id: "2", name: "Domates", status: false },
        { id: "3", name: "Biber", status: false },
        { id: "4", name: "Sosis", status: true },
        { id: "5", name: "Mısır", status: true },
        { id: "6", name: "Sucuk", status: false },
        { id: "7", name: "Kanada Jambonu", status: false },
        { id: "8", name: "Pastırma", status: false },
        { id: "9", name: "Ananas", status: true },
        { id: "10", name: "Tavuk Izgara", status: false },
        { id: "11", name: "Jalepeno", status: true },
        { id: "12", name: "Kabak", status: true },
        { id: "13", name: "Soğan", status: false },
        { id: "14", name: "Sarımsak", status: false }
    

    ]);
    const handleToppingsChange = (event) => {
      const selectedToppings = toppings.filter((topping) => event.target.value.includes(topping.name));
      if( event.target.checked == true ){
        setPrice(price+5);

      }

        else{
          setPrice(price-5);
      }
      console.log(price);
    };
    const [formValues, setFormValues] = useState({
      isim: '',
      boy: '',
      sos: '',
      malzemeler: [],
      not: '',
    });

    const [formErrors, setFormErrors] = useState({
      isim: '',
      boy: '',
      sos: '',
      malzemeler: '',
      not: '',
    });

  const [orderCount, setOrderCount] = useState(1);
  const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === 'checkbox' ? [...formValues[name], value] : checked ? value : '';
      setFormValues((prevValues) => ({ ...prevValues, [name]: newValue }));
    };

  const handleCountDecrease = () => {
    setOrderCount(orderCount - 1);
  };

  const handleCountIncrease = () => {
    setOrderCount(orderCount + 1);
  };

  const handleOrderSubmit = async (e) => {
      e.preventDefault();
      const schema = Yup.object().shape({
          isim: Yup.string().required('Lütfen adınızı giriniz.'),
          boy: Yup.string().required('Lütfen pizza boyunu seçiniz.'),
          sos: Yup.string().required('Lütfen sos seçiniz.'),
          malzemeler: Yup.array().max(10, 'En fazla 10 malzeme seçebilirsiniz.'),
        });
        try {
          await schema.validate(formValues, { abortEarly: false });
          // Sipariş gönderme işlemini gerçekleştir
        } catch (error) {
          const newErrors = {};
          error.inner.forEach((err) => {
            newErrors[err.path] = err.message;
          });
          setFormErrors(newErrors);
        }
      };      
    return(
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
            <strong><p  className='pricing-padding'>85.50 ₺</p></strong>
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
            <legend>Boyut Seç</legend>
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
            <br/>
        </form>
        <div className='child'>
          <h2>Ek Malzemeler</h2>
          <p>En fazla 10 malzeme seçebilirsiniz.5₺</p>
          {toppings.map((topping) => (
            <label key={topping.id}>
              <input type="checkbox" value={topping.name} onChange={handleToppingsChange} />
              {topping.name}
            </label>
            
          ))}
        
        </div>
        <div className="child">
    <h2>Sipariş Notu</h2>
    <from>
    <textarea name="not" placeholder="Siparişine eklemek istediğin bir not var mı?"></textarea>
    </from>
    
   </div>
   <div className='child'>
        <form onSubmit={handleOrderSubmit}>
          <div>
            <label htmlFor="isim">Adınız:</label>
            <input type="text" id="isim" name="isim" value={formValues.isim} onChange={handleInputChange} />
            {formErrors.isim && <div>{formErrors.isim}</div>}
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
        <input  value={price}>
        </input>

        <Link to='/success'><button type='submit'>Sipariş Oluştur</button></Link>
      </div>
</form>
</div>
      
      </div>
      </div>
    );
};
