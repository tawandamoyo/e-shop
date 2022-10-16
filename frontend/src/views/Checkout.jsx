import React from 'react'

export default function() {
    return (
        <div>
            <Nav>

            </Nav>
            <div className='checkout-details-container'>
                <div className='checkout-contents'>
                    <h3>Change your cart contents</h3>
                    <div className='checkout-items'>
                        <div className='checkout-item'>
                            <div>
                                <div>Pizza Image</div>
                                <div>Delete item/Edit item</div>
                            </div>
                            <div>
                                <h4>Item details</h4>
                                <p>$20</p>
                            </div>
                            <div>
                                <h4>BBQ Spare Rib and Mushroom</h4>
                                <ul>
                                    <li>Base/ Traditional</li>
                                    <li>Extra 1/ Price</li>
                                    <li>Extra 2/ Price</li>
                                </ul>
                            </div>
                        </div>

                        <div className='checkout-item'>
                            <div>
                                <div>Pizza Image</div>
                                <div>Delete item/Edit item</div>
                            </div>
                            <div>
                                <h4>Item details</h4>
                                <p>$20</p>
                            </div>
                            <div>
                                <h4>BBQ Spare Rib and Mushroom</h4>
                                <ul>
                                    <li>Base/ Traditional</li>
                                    <li>Extra 1/ Price</li>
                                    <li>Extra 2/ Price</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h3>Cart Contents</h3>
                    <div>
                        <h4>Large Magherita / Price</h4>
                        <h4>Large Magherita / Price</h4>
                        <h4>Large Magherita / Price</h4>
                        <h4>Delivery Cost</h4>
                        <h4>Total/ Price</h4>
                    </div>
                    <div>
                        <h4>Delivery Address</h4>
                        <p>
                            23 Milner St
                            New Yok
                        </p>
                    </div>

                    < Button/>
                </div>
            </div>
        </div>
    )
}