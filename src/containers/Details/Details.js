import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {ADD_TO_CART} from '../../redux/action-type'

import classes from './Details.module.css';
import mutualClasses from '../../App.module.css';

import { getDetailsData } from '../../utils/APIController';
import { Preloader } from '../../components/Preloader/Preloader';

export const Details = (props) => {

  const [detailsData, setDetailsData] = useState({});
  const [thumbnails, setThumbnails] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [thumbnailPos, setThumbnailPos] = useState(0);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [showPreLoader, setShowPreLoader] = useState(true);

  const onIncrementAmountOfProducts = useDispatch();

  const onAddToCartClick = () => {

    let amountOfProducts;
    if (!localStorage['amountOfProducts']) amountOfProducts = 0;
    else {
      amountOfProducts = localStorage['amountOfProducts'];
    }
    amountOfProducts++;
    onIncrementAmountOfProducts({ type: ADD_TO_CART });
    localStorage.setItem('amountOfProducts', amountOfProducts);

    let amountOfEachProduct;
    if (!localStorage[`product_${props.match.params.productId}`]) amountOfEachProduct = 0;
    else amountOfEachProduct = JSON.parse(localStorage[`product_${props.match.params.productId}`]).amount;
    amountOfEachProduct++;

    const obj = {
      'id': detailsData.id,
      'thumbnail': detailsData.preview,
      'name': detailsData.name,
      'price': detailsData.price,
      'amount': amountOfEachProduct
    };

    localStorage.setItem(`product_${props.match.params.productId}`, JSON.stringify(obj));

  }

  const selectCurrentThumbnail = (pos) => {
    setPreviewImage(detailsData.photos[pos]);
    setThumbnailPos(pos);
  }

  useEffect(() => {
    const productId = props.match.params.productId;

    if (productId !== undefined && productId !== null && productId !== '' && parseInt(productId) > 0) {

      getDetailsData(productId)
        .then(response => {
          setDetailsData(response);
          setThumbnails(response.photos)
          setPreviewImage(response.photos[0])
          setShowPreLoader(false)
        })
        .catch(error => {
          console.log(error)
        })

    }

  }, [props.match.params.productId])

  useEffect(() => {

    const handleThumbnails = () => {
      if (window.matchMedia("(max-width: 600px)").matches) {
        setShowThumbnails(false)
      } else {
        setShowThumbnails(true)
      }
    }

    if (window.matchMedia("(max-width: 600px)").matches) {
      setShowThumbnails(false)
    } else {
      setShowThumbnails(true)
    }

    window.addEventListener('resize', handleThumbnails);
    return () => window.removeEventListener('resize', handleThumbnails);

  }, [])

  const detailsDataRender = detailsData;
  const Thumbnails = thumbnails.map((item, pos) => {

    let ClassesArr = [classes.Thumbnail];

    if (pos === thumbnailPos) {
      ClassesArr.push(classes.SelectedThumbnail);
    }

    return (
      <img
        onClick={() => selectCurrentThumbnail(pos)}
        className={ClassesArr.join(' ')} src={item}
        alt="Thumbnail" key={pos}
      />
    )

  });

  const renderThumbnails = <div><h3>Preview</h3>{Thumbnails}</div>;

  return (

    <Preloader visible={showPreLoader} >

      <div className={[mutualClasses.Container, classes.Details].join(' ')} >

        <div className={classes.Left}>
          <img src={previewImage} alt={detailsDataRender.name} />
        </div>

        <div className={classes.Right}>
          <h1>{detailsDataRender.name}</h1>
          {!showThumbnails ? renderThumbnails : null}
          <p className={classes.Brand}>{detailsDataRender.brand}</p>
          <p className={classes.Price}>
            Price: Rs <span>{detailsDataRender.price}</span>
          </p>
          <h3>Description</h3>
          <p className={classes.Desc}>{detailsDataRender.description}</p>
          <div>
            {showThumbnails ? renderThumbnails : null}
          </div>
          <button onClick={onAddToCartClick}>Add to Cart</button>
        </div>

      </div>

    </Preloader>

  );
}