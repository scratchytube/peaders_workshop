import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filteredProducts } from '../redux/product'
import { toggleView } from '../redux/product'
import styled from 'styled-components'
import { BsFillGridFill, BsList } from 'react-icons/bs'

const Sort = () => {
    const [filterSort, setFilterSort] = useState('name-a')
    const dispatch = useDispatch()
    const products = useSelector(state => state.product.filtered_products)
    const theGridView = useSelector(state => state.product.isGridView)

    const toggleGridAndListView = () => {
        dispatch(toggleView())
    }

    const sorter = () => {
    if (filterSort === 'name-a') {
        console.log('its me a-z!')
    }
    if (filterSort === 'name-z') {
        console.log('its me z-a!')
    }
    if (filterSort === 'price-lowest') {
        const sortedByLowestPrice = [...products].sort((a,b) => (
            a.price - b.price
        ))
        dispatch(filteredProducts(sortedByLowestPrice))
    }
    if (filterSort === 'price-highest') {
        console.log('its me high-low!')
    }
}

    return (
        <Wrapper>
            <div className="btn-container">
                <button onClick={toggleGridAndListView} type="button" className={`${ theGridView ? 'active' : null }`} >
                    <BsFillGridFill />
                </button>
                <button onClick={toggleGridAndListView} type="button" className={`${ theGridView ? null : 'active' }`}>
                    <BsList />
                </button>
            </div>
            <p>
                { products.length } products found
            </p>
            <hr />
            <form>
                <label htmlFor="sort">sort by</label>
                <select name="sort" 
                id="sort" 
                className='sort-input'
                value={filterSort}
                onChange={(e) => setFilterSort(e.target.value)}
                >
                    <option value="price-lowest">price (lowest)</option>
                    <option value="price-highest">price (highest)</option>
                    <option value="name-a">name (a-z)</option>
                    <option value="name-z">name (z-a)</option>
                </select>
            </form>
        </Wrapper>
    )
}

export default Sort

const Wrapper = styled.section`
display: grid;
grid-template-columns: auto auto 1fr auto;
align-items: center;
margin-bottom: 2rem;
column-gap: 2rem;

@media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
        width: 50px;
    }
    label {
        display: inline-block;
        margin-right: 0.5rem;
    }
}

@media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
      text-transform: capitalize;
      margin-bottom: 0;
  }

  .btn-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 0.5rem;
      button {
          background: transparent;
          border: 1px solid var(--clr-black);
          color: var(--clr-black);
          width: 1.5rem;
          border-radius: var(--radius);
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          svg {
              font-size: 1rem;
          }
      }
      .active {
        background: var(--clr-black);
        color: var(--clr-white);
    }
  }

  .sort-input {
      border-color: transparent;
      font-size: 1rem;
      text-transform: capitalize;
      padding: 0.25rem 0.5rem;
      cursor: pointer;
  }
  label {
      font-size: 1rem;
      text-transform: capitalize;
  }
  
`
