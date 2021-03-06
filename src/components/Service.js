import React, {useState, useEffect} from 'react';
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import '../css/search_bar.css'
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllService, createNewService, updateService, deleteService, getServiceByName } from '../redux/actions/service';
import {saveServiceToRedux} from '../redux/actions/salary'
import { Link } from 'react-router-dom';
const Service = () =>{
    const [isShow, setIsShow] = useState(false);
    const data = useSelector(state => state.service.data);
    const [services, setServices] = useState(data);
    const [isAdd, setIsAdd] = useState(false);
    const location = useLocation();
    const [indexEditService, setIndexEditService] = useState(null);
    const [name, setName] = useState(null);

    const [isPrice, setIsPrice] = useState(true);
    const [isMandatory, setIsMandatory] = useState(true);
    const [iconLoad, setIconLoad] = useState(null);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllService());
        return () => {
            console.log(location.pathname);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    useEffect(() => {
        setServices(data);
    }, [data])

    const editClick = (index) => {
        setIsShow(true);
        setIsAdd(false);
        setIndexEditService(index);
        document.getElementById('is-required').value = services[index].required;
        document.getElementById('name').value = services[index].name;
        document.getElementById('price').value = services[index].price;
        document.getElementById('type').value = services[index].type;
        document.querySelector('.form-post').classList.add('active');
    }

    const popUpActive = (mode) => {
        setIsShow(true);
        setIsAdd(true);
        document.querySelector('.form-post').classList.add('active');
        if(mode === "edit") {
            document.querySelector('.dialog__title').textContent = "S???a th??ng tin d???ch v???";
        }
        else {
            document.querySelector('.dialog__title').textContent = "Th??m m???i d???ch v???";
        }
    }

    const cancelClick = () => {
        setIsShow(false);
        setIsAdd(false);
        document.getElementById('is-required').value = "";
        document.getElementById('name').value = "";
        document.getElementById('price').value = "";
        document.getElementById('type').value = "";
        document.querySelector('.form-post').classList.remove('active');
    }

    const addOrUpdateItem = () => {
        if(isAdd){
            addService();
        }
        else{
            editService();
        }
    }

    const editService = () => {
        const name = document.getElementById('name').value;
        const isRequired = document.getElementById('is-required').value;
        const price = document.getElementById('price').value;
        const type = document.getElementById('type').value;
        
        const validateIsRequired = validateMandatory(isRequired);
        setIsMandatory(validateIsRequired);
        const validateIsPrice = validatePrice(price);
        setIsPrice(validateIsPrice);
        console.log(validateIsPrice,validateIsRequired);
        if(! (validateIsPrice&&validateIsRequired))
            return;
        
        const data = {
            name: name,
            required: isRequired,
            price: Number(price),
            type: type
        }
        dispatch(updateService(services[indexEditService].id, data));
        setIconLoad(true)
            setTimeout(() => {
                dispatch(getAllService())
                setIconLoad(false)
            }, 300)
        cancelClick();
    }

    const removeService = (id) => {
        if(id){
            dispatch(deleteService(id));
            setIconLoad(true)
            setTimeout(() => {
                dispatch(getAllService())
                setIconLoad(false)
            }, 300)
        }
    }

    const addService = () => {
        const name = document.getElementById('name').value;
        const isRequired = document.getElementById('is-required').value;
        const price = document.getElementById('price').value;
        const type = document.getElementById('type').value;
        
        const validateIsRequired = validateMandatory(isRequired);
        setIsMandatory(validateIsRequired);
        const validateIsPrice = validatePrice(price);
        setIsPrice(validateIsPrice);
        console.log(validateIsPrice,validateIsRequired);
        if(! (validateIsPrice&&validateIsRequired))
            return;

        const data = {
            name: name,
            required: Number(isRequired),
            price: Number(price),
            type: type
        }

        dispatch(createNewService(data));
        setIconLoad(true)
            setTimeout(() => {
                dispatch(getAllService())
                setIconLoad(false)
            }, 300)
        cancelClick();
    }

    const viewSalary = (service) => {
        dispatch(saveServiceToRedux(service));
    }
    
    const onNameChange = (e) => {
        setName(e.target.value);
        console.log('name changed', name);
    }

    const searchServiceByName = () => {
        console.log('dispatching ',name);
        dispatch(getServiceByName(name));
    }

    const validateMandatory = (mandatory) => {
        return (mandatory === 1||mandatory === 0);
    }

    const validatePrice = (price) => {
        if(!isNaN(price) && price >0)
            return true;
        else
            return false;
    }

    const onPrevent = (e) => {
        e.preventDefault()
    }
    return(
        <div style={{position: 'relative'}}>
            <div class="loading-content" style={{ display: iconLoad ? "block" : "none" }}>
                    <div class="loader"></div>
            </div>
            <div style={{display: isShow ? 'block' : 'none'}} className="modal">
            <div className="form-post">
                <div className="form-post__title dialog__title">
                    {/* Th??m m???i d???ch v??? */}
                </div>
                <div className="form-post__content">
                    <div className="form-post__wrapper">
                        <div className="form-post__field">
                            <input style={{width: '100%'}} type="text" id='name' placeholder = "T??n d???ch v???"/>
                        </div>
                        <div className="form-post__field">
                            <input style={{width: '100%'}} type="text" id='is-required' placeholder = "D???ch v??? b???t bu???c? (1 n???u c??, 0 n???u ng?????c l???i)"/>
                            <span style={{display: isMandatory ? "none" : ""}} className='validate-phone'>Nh???p 1 ho???c 0</span>
                        </div>
                        <div className="form-post__field">
                            <input style={{width: '100%'}} type="text" id='price' placeholder = "Gi??"/>
                            <span style={{display: isPrice ? "none" : ""}} className='validate-phone'>Nh???p l?????ng gi?? ph?? h???p</span>
                        </div>
                        <div className="form-post__field">
                            <input style={{width: '100%'}} type="text" id='type' placeholder = "Lo???i d???ch v???"/>
                        </div>
                    </div>
                    <div className="form-post__control">
                        <button onClick={() => cancelClick() } className="cancel-btn">
                            H???y
                        </button>
                        <button className="add-section-btn" onClick={() => addOrUpdateItem()}>
                            <i className='bx bx-save'></i>
                            L??u
                        </button>
                    </div>
                </div>  
            </div>
            </div>
            <div style={{maxWidth: "1100px", minHeight: "100vh"}} className="admin-post__container">
                <div className="admin-post__wrapper">
                    <div className="admin-post__head">
                            <div style={{ fontSize: "20px", marginLeft: "-20px" }} className="admin-post__title">
                                    T??m ki???m d???ch v???:
                                    <br />
                            </div>                            
                            <form action={onPrevent} class="search-bar">
                                <input value={name} onChange={(e) => {onNameChange(e)}}type="search" name="search" pattern=".*\S.*" required />
                                <button onClick={() => searchServiceByName()} class="search-btn" type="submit">
                                    <span>Search</span>
                                </button>
                            </form>                            
                            <div style={{ right: '10px' }} className="admin-post__button">
                                <button onClick={() => popUpActive()}>
                                    Th??m d???ch v??? m???i
                                </button>
                            </div>
                        </div>
                        <div style={{ fontSize: "20px", marginLeft: "-20px" }} className="admin-post__title">
                                Th??ng tin c??c d???ch v???
                                <br />
                        </div>
                    <div className="admin-post__body">
                        <table id="admin-post__table">
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th style={{width: '200px'}}>T??n d???ch v???</th>
                                    <th style={{width: '200px'}}>D???ch v??? b???t bu???c?</th>
                                    <th style={{width: '200px'}}>Gi??</th>
                                    <th style={{width: '200px'}}>Lo???i d???ch v???</th>
                                    {/* <th style={{width: '200px'}} >Employees</th>
                                    <th style={{width: '105px'}}>View Employee</th> */}
                                    <th style={{width: '105px'}}>Xem m???c l????ng</th>
                                    <th style={{width: '105px'}}>S???a</th>
                                    <th style={{width: '105px'}} >X??a</th>
                                </tr>
                                {
                                    services?.map((item, index) => (
                                        <tr key = {index}>
                                            <td>{index+1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.required===1 ? "C??": "Kh??ng"}</td>
                                            <td>{item.price}</td>
                                            <td>{item.type}</td>
                                            {/* <td>{item?.numberOfEmployee}</td> */}
                                            {/* <td>
                                                <button onClick={() => viewEmployee(item.id)} className="post-edit-item-btn">
                                                    <i className='bx bxs-pencil'></i>
                                                    View
                                                </button>
                                            </td> */}
                                            <td>
                                                    <Link to={{
                                                        pathname: "/salary",
                                                        search: `?serviceId=` + item?.id,
                                                    }}>
                                                        <button onClick={() => viewSalary(item)} className="post-edit-item-btn">
                                                            <i className='bx bxs-pencil'></i>
                                                            Xem
                                                        </button>
                                                    </Link>
                                            </td>
                                            <td>
                                                <button onClick={() => editClick(index)} className="post-edit-item-btn">
                                                    <i className='bx bxs-pencil'></i>
                                                    S???a
                                                </button>
                                            </td>
                                            <td>
                                                <button className="post-delete-btn" onClick={() => removeService(item.id)}>
                                                    <i className='bx bx-trash'></i>
                                                    X??a
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>            
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service;