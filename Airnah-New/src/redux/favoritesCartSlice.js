import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
	fetchFavorites,
	fetchCartItems,
	addToFavoritesAPI,
	removeFromFavoritesAPI,
	addToCartAPI,
	removeFromCartAPI,
} from '../utils/api'

export const fetchUserFavorites = createAsyncThunk(
	'favoritesCart/fetchFavorites',
	async (userId, { rejectWithValue }) => {
		try {
			return await fetchFavorites(userId)
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const fetchUserCartItems = createAsyncThunk(
	'favoritesCart/fetchCartItems',
	async (userId, { rejectWithValue }) => {
		try {
			return await fetchCartItems(userId)
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const addToFavorites = createAsyncThunk(
	'favoritesCart/addToFavorites',
	async ({ dbId, product_id }, { rejectWithValue }) => {
		try {
			return await addToFavoritesAPI(dbId, product_id)
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const removeFromFavorites = createAsyncThunk(
	'favoritesCart/removeFromFavorites',
	async ({ userId, productId }, { rejectWithValue }) => {
		try {
			console.log({ userId, productId })
			await removeFromFavoritesAPI(userId, productId)
			return { favorite_id: productId }
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const addToCart = createAsyncThunk(
	'favoritesCart/addToCart',
	async (
		{ userId, productId, diamondId, ringStyleId, quantity },
		{ rejectWithValue }
	) => {
		try {
			return await addToCartAPI(
				userId,
				productId,
				diamondId,
				ringStyleId,
				quantity
			)
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const removeFromCart = createAsyncThunk(
	'favoritesCart/removeFromCart',
	async ({ userId, productId }, { rejectWithValue }) => {
		try {
			await removeFromCartAPI(userId, productId)
			return { cart_id: productId }
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

const favoritesCartSlice = createSlice({
	name: 'favoritesCart',
	initialState: {
		favorites: [],
		cartItems: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Fetch Favorites
			.addCase(fetchUserFavorites.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchUserFavorites.fulfilled, (state, action) => {
				state.loading = false
				state.favorites = action.payload
			})
			.addCase(fetchUserFavorites.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})

			// Fetch Cart Items
			.addCase(fetchUserCartItems.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchUserCartItems.fulfilled, (state, action) => {
				state.loading = false
				state.cartItems = action.payload
			})
			.addCase(fetchUserCartItems.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})

			// Add to Favorites
			.addCase(addToFavorites.fulfilled, (state, action) => {
				state.favorites.push(action.payload)
			})

			// Remove from Favorites
			.addCase(removeFromFavorites.fulfilled, (state, action) => {
				const favoriteId = action.payload.favorite_id
				state.favorites = state.favorites.filter(
					(item) => item.favorite_id !== favoriteId
				)
			})

			// Add to Cart
			.addCase(addToCart.fulfilled, (state, action) => {
				state.cartItems.push(action.payload)
			})

			// Remove from Cart
			.addCase(removeFromCart.fulfilled, (state, action) => {
				const cartId = action.payload.cart_id
				state.cartItems = state.cartItems.filter(
					(item) => item.cart_id !== cartId
				)
			})
	},
})

export default favoritesCartSlice.reducer
