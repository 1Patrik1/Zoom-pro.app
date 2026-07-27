import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/async-handler.js';
import { requireCapability } from '../middleware/require-capability.js';
import { validateRequest } from '../middleware/validate-request.js';
import { validators } from '../validators/request-validators.js';
import { usersService } from '../services/users.service.js';

const router = Router();
router.post('/role', auth, requireCapability('team.edit_roles'), validateRequest({ body: validators.userRole }), asyncHandler(async (req, res) => res.json({ ok: true, user: await usersService.updateRole(req.user, req.body) })));
router.post('/approve', auth, requireCapability('team.approve'), validateRequest({ body: validators.userApprove }), asyncHandler(async (req, res) => res.json({ ok: true, user: await usersService.approve(req.user, req.body) })));
export default router;
