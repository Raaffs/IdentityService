package store

import (
	"context"
	"errors"

	"github.com/Raaffs/profileManager/server/internal/models"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)
type PostgresProfileRepo struct {
	Pool *pgxpool.Pool
}

func (r *PostgresProfileRepo) GetProfileByUserID(ctx context.Context, userID int) (*models.Profile, error) {
	var p models.Profile
	query:=`
		SELECT 
		user_id,
		full_name,
		date_of_birth,
		phone_number,
		address,
		aadhaar_number,
		unique_id
		FROM profiles
		WHERE user_id=$1
	`
     if err:=r.Pool.QueryRow(
		ctx,
		query,
		userID,
	).Scan(
		&p.UserID,
		&p.FullName,
		&p.DateOfBirth,
		&p.PhoneNumber,
		&p.Address,
		&p.AadhaarNumber,
		&p.UniqueID,	
	);err!=nil{
		if errors.Is(err, pgx.ErrNoRows){
			return nil, models.NotFound
		}
		return nil, err
	}
	return &p, nil
}

func (r *PostgresProfileRepo) Create(ctx context.Context, profile models.Profile) error {
	query:=`
		INSERT INTO profiles (user_id,full_name,date_of_birth,phone_number,address,aadhaar_number,unique_id)
		VALUES ($1,$2,$3,$4,$5,$6,$7)
	`
	_,err:=r.Pool.Exec(
		ctx,
		query,
		profile.UserID,
		profile.FullName,
		profile.DateOfBirth,
		profile.PhoneNumber,
		profile.Address,
		profile.AadhaarNumber,
		profile.UniqueID,
	);if err!=nil{
		return err
	}
	return nil
}

func (r *PostgresProfileRepo) Update(ctx context.Context, profile models.Profile) error {
	return nil
}

func (r *PostgresProfileRepo) Delete(ctx context.Context, userID int) error {
	return nil
}
