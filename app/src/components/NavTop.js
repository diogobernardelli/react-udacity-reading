import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, MenuItem, SelectField } from 'material-ui';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { Categories } from './Categories';

export const NavTop = ({ history, title, categories, categorySelected, sortSelected, handleChangeCategory, handleChangeSort, hideToobar }) => (
    <div>
        <AppBar
            className="appbar"
            title={title}
        />
        {!hideToobar && (
            <Toolbar style={{ backgroundColor: '#fff', padding: 40 }}>
                <ToolbarGroup>
                    <ToolbarTitle text="Categorias:" />
                    <Categories
                        history={history}
                        categories={categories}
                        categorySelected={categorySelected}
                        handleChange={handleChangeCategory}
                        showFirstElement={true} />
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarTitle text="Ordenar por:" />
                    <SelectField value={sortSelected} onChange={(event, index, sortSelected) => handleChangeSort(sortSelected)}>
                        <MenuItem value={'-voteScore'} primaryText="Votos" />
                        <MenuItem value={'-timestamp'} primaryText="Data" />
                    </SelectField>
                </ToolbarGroup>
            </Toolbar>
        )}
        
    </div>
);

NavTop.defaultProps = {
    title: '',
    categories: [],
    categorySelected: 'all',
    sortSelected: '-voteScore'
};

NavTop.propTypes = {
    title: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    categorySelected: PropTypes.string.isRequired,
    sortSelected: PropTypes.string.isRequired,
    handleChangeCategory: PropTypes.func.isRequired,
    handleChangeSort: PropTypes.func.isRequired
};