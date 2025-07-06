import React from 'react';
import { CategoryWrapper, CategoryItem } from './style';

const CategoryFilterComponent = ({ categories, activeCategory, onChange }) => {
    return (
        <CategoryWrapper>
            {categories.map((category) => (
                <CategoryItem
                    key={category._id}
                    active={activeCategory === category._id}
                    onClick={() => onChange(category._id)}
                >
                    {category.name}
                </CategoryItem>
            ))}
        </CategoryWrapper>
    );
}
export default CategoryFilterComponent;